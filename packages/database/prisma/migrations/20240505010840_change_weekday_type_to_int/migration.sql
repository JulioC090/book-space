/*
  Warnings:

  - The primary key for the `SpaceAvailability` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `weekday` on the `SpaceAvailability` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SpaceAvailability" DROP CONSTRAINT "SpaceAvailability_pkey",
DROP COLUMN "weekday",
ADD COLUMN     "weekday" INTEGER NOT NULL,
ADD CONSTRAINT "SpaceAvailability_pkey" PRIMARY KEY ("spaceId", "weekday");
