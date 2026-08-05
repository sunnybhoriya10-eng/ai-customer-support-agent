/*
  Warnings:

  - You are about to drop the `AgentLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RefundRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `createdAt` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `delivered` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refundDays` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `used` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AgentLog";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Order";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RefundRequest";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "delivered" BOOLEAN NOT NULL,
    "used" BOOLEAN NOT NULL,
    "refundDays" INTEGER NOT NULL
);
INSERT INTO "new_Customer" ("email", "id", "name") SELECT "email", "id", "name" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
