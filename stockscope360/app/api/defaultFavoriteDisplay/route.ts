import { NextRequest, NextResponse } from "next/server";
import pool from "@/libs/mysql";
import { StockDisplayInfo } from "@/types";
import { RowDataPacket } from "mysql2";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const start_date = searchParams.get("start_date");
  const end_date = searchParams.get("end_date");
  const email = searchParams.get("email");
  const stockIds = searchParams.getAll("stockIds");

  if (stockIds.length == 0 && !email) return NextResponse.json("No Stock Ids");

  try {
    const db = await pool.getConnection();

    let query;
    let params;

    if (email !== null) {
      query = `  SELECT f.StockId, sm.Name AS StockName, YEAR(sp.Date) AS Year, Month(sp.Date) AS Month, AVG(sp.ClosingPrice) AS AvgClosingPrice
                        FROM
                            (SELECT UserId, StockId
                            FROM UserInfo NATURAL JOIN Favorites
                            WHERE Email=?) as f
                        JOIN
                            StockMetadata sm ON f.StockId = sm.StockId
                        JOIN
                            StockPrice sp ON f.StockId = sp.StockId
                        WHERE
                            sp.Date BETWEEN ? AND ?
                        GROUP BY
                            f.StockId,
                            YEAR(sp.Date),
                            Month(sp.Date)`;
      params = [email, start_date, end_date];
    } else {
      const placeholders = stockIds.map(() => "?").join(",");
      query = ` SELECT
                        sp.StockId,
                        sm.Name AS StockName,
                        YEAR(sp.Date) AS Year,
                        MONTH(sp.Date) AS Month,
                        AVG(sp.ClosingPrice) AS AvgClosingPrice
                    FROM
                        (SELECT *
                        FROM StockPrice
                        WHERE StockId IN (${placeholders})) as sp
                    JOIN
                        (SELECT *
                        FROM StockMetadata
                        WHERE StockId IN (${placeholders})) as sm
                    ON
                        sp.StockId = sm.StockId
                    WHERE
                        sp.Date BETWEEN ? AND ?
                    GROUP BY
                        sp.StockId,
                        YEAR(sp.Date),
                        MONTH(sp.Date)`;
      params = [...stockIds, ...stockIds, start_date, end_date];
    }

    const [rows] = await db.execute<RowDataPacket[]>(query, params);
    db.release();

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Stock info not found" },
        { status: 404 }
      );
    }

    const displayInfo = rows as StockDisplayInfo[];

    return NextResponse.json(displayInfo);
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}
