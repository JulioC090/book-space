-- CreateTable
CREATE TABLE "SpaceAvailability" (
    "spaceId" TEXT NOT NULL,
    "weekday" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,

    CONSTRAINT "SpaceAvailability_pkey" PRIMARY KEY ("spaceId","weekday")
);

-- AddForeignKey
ALTER TABLE "SpaceAvailability" ADD CONSTRAINT "SpaceAvailability_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "workspace_spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
