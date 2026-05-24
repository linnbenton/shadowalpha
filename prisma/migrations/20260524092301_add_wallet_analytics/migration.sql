-- CreateTable
CREATE TABLE "WalletStats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "wallet" TEXT NOT NULL,
    "totalTrades" INTEGER NOT NULL DEFAULT 0,
    "winRate" REAL NOT NULL DEFAULT 0,
    "pnl" REAL NOT NULL DEFAULT 0,
    "lastUpdated" DATETIME NOT NULL
);
