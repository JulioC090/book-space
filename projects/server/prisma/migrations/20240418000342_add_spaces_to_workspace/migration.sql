-- CreateTable
CREATE TABLE "workspace_spaces" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "maxAmountOfPeople" INTEGER,
    "workspaceId" TEXT,

    CONSTRAINT "workspace_spaces_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workspace_spaces" ADD CONSTRAINT "workspace_spaces_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE SET NULL ON UPDATE CASCADE;
