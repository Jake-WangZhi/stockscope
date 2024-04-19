import { NextRequest, NextResponse } from "next/server";
import pool from "@/libs/mysql";
import { StockTableInfo } from "@/types";
import { RowDataPacket } from "mysql2";

export interface StockId {
  StockId: number;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { stockQuery: string; marketName: string } }
) {
  const { searchParams } = new URL(request.url);
  const stockQuery = searchParams.get("stockQuery");
  const marketName = searchParams.get("marketName");
  const email = searchParams.get("email");

  try {
    const db = await pool.getConnection();
    const query1 = `CALL SearchStock ("${stockQuery}", "${marketName}")`;
    const [rows] = await db.execute<RowDataPacket[]>(query1, [
      stockQuery,
      marketName,
    ]);

    const stockTableInfo = rows[0] as StockTableInfo[];

    const query2 = `SELECT StockId 
      FROM Favorites 
      WHERE UserId = (
          SELECT UserId 
          FROM UserInfo 
          WHERE Email = '${email}'
      );`;
    const [stockIdRows] = await db.execute<RowDataPacket[]>(query2, [email]);

    const stockIds = stockIdRows as StockId[];
    db.release();

    const stockTableInfoWithFavorites = stockTableInfo.map((stockInfo) => {
      const isFavorite = stockIds.some(
        (stock) => stock.StockId === stockInfo.StockId
      );

      return { ...stockInfo, IsFavorite: isFavorite };
    });

    return NextResponse.json(stockTableInfoWithFavorites);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
