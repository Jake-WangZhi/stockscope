import { NextRequest, NextResponse } from "next/server";
import pool from "@/libs/mysql";
import { StockTableInfo } from "@/types";
import { RowDataPacket } from "mysql2";

export async function GET(
  request: NextRequest,
  { params }: { params: { stockQuery: string, marketName: string, } }
) {
  const stockQuery = params.stockQuery;
  const marketName = params.marketName;

  try {
    const db = await pool.getConnection();
    const query = `CALL SearchStock ("${stockQuery}", "${marketName}")`;
    const [rows] = await db.execute<RowDataPacket[]>(query, [stockQuery, marketName]);
    db.release();

    const stockTableInfo = rows[0] as StockTableInfo[];

    return NextResponse.json(stockTableInfo);
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}

