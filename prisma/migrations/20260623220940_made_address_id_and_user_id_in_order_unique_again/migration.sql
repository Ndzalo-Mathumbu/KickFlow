/*
  Warnings:

  - A unique constraint covering the columns `[addressID]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userID]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order_addressID_key" ON "Order"("addressID");

-- CreateIndex
CREATE UNIQUE INDEX "Order_userID_key" ON "Order"("userID");
