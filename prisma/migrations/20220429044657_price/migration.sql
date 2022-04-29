/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ArchivedInventory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ArchivedInventory" ADD COLUMN     "price" DECIMAL(65,30) NOT NULL DEFAULT 0.01;

-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "price" DECIMAL(65,30) NOT NULL DEFAULT 0.01;

-- CreateIndex
CREATE UNIQUE INDEX "ArchivedInventory_name_key" ON "ArchivedInventory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_name_key" ON "Inventory"("name");
