import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.sosovalue.com/your-endpoint", {
      headers: {
        Authorization: `Bearer ${process.env.SOSO_API_KEY}`,
      },

      cache: "no-store",
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({
      error: "failed_to_fetch_intelligence",
    });
  }
}
