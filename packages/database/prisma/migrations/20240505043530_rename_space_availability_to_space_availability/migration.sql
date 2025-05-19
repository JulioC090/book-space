/*
  Warnings:

  - You are about to drop the `SpaceAvailability` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SpaceAvailability" DROP CONSTRAINT "SpaceAvailability_spaceId_fkey";

-- DropTable
DROP TABLE "SpaceAvailability";

-- CreateTable
CREATE TABLE "space_availability" (
    "spaceId" TEXT NOT NULL,
    "weekday" INTEGER NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,

    CONSTRAINT "space_availability_pkey" PRIMARY KEY ("spaceId","weekday")
);

-- AddForeignKey
ALTER TABLE "space_availability" ADD CONSTRAINT "space_availability_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "workspace_spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
