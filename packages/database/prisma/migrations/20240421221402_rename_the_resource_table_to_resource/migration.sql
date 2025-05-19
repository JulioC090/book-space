/*
  Warnings:

  - You are about to drop the `Resource` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "space_resources" DROP CONSTRAINT "space_resources_resourceId_fkey";

-- DropTable
DROP TABLE "Resource";

-- CreateTable
CREATE TABLE "resource" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "resource_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "resource" ADD CONSTRAINT "resource_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "space_resources" ADD CONSTRAINT "space_resources_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
