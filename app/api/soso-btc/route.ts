import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    `${process.env.SOSOVALUE_API_URL}/currencies/1673723677362319866/market-snapshot`,
    {
      headers: {
        "x-soso-api-key": process.env.SOSOVALUE_API_KEY || "",
      },
    },
  );

  const data = await res.json();

  return NextResponse.json(data);
}
