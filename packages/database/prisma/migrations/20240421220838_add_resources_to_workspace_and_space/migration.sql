/*
  Warnings:

  - Made the column `workspaceId` on table `workspace_spaces` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "workspace_spaces" DROP CONSTRAINT "workspace_spaces_workspaceId_fkey";

-- AlterTable
ALTER TABLE "workspace_spaces" ALTER COLUMN "workspaceId" SET NOT NULL;

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "space_resources" (
    "spaceId" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,

    CONSTRAINT "space_resources_pkey" PRIMARY KEY ("spaceId","resourceId")
);

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace_spaces" ADD CONSTRAINT "workspace_spaces_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "space_resources" ADD CONSTRAINT "space_resources_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "workspace_spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "space_resources" ADD CONSTRAINT "space_resources_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
