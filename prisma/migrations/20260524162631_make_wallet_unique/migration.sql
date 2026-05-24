/*
  Warnings:

  - A unique constraint covering the columns `[wallet]` on the table `WalletStats` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WalletStats_wallet_key" ON "WalletStats"("wallet");
