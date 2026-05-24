import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { txHash, asset, side, signal, confidence, reason, status } = body;

    const execution = await prisma.execution.create({
      data: {
        txHash,
        asset,
        side,
        signal,
        confidence,
        reason,
        status,
      },
    });

    await prisma.walletStats.upsert({
      where: { wallet: body.wallet },
      update: {
        totalTrades: { increment: 1 },
      },
      create: {
        wallet: body.wallet,
        totalTrades: 1,
        winRate: 0,
        pnl: 0,
      },
    });

    return Response.json({
      success: true,
      data: execution,
    });
  } catch (err) {
    return Response.json(
      { success: false, error: "failed to store execution" },
      { status: 500 },
    );
  }
}
