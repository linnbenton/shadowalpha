import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.SOSOVALUE_API_URL}/currencies`, {
      headers: {
        "x-soso-api-key": process.env.SOSOVALUE_API_KEY || "",
      },
      cache: "no-store",
    });

    const data = await res.json();

    return NextResponse.json({
      success: true,
      status: res.status,
      data,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: String(err),
    });
  }
}
