-- CreateTable
CREATE TABLE "workspaces_users" (
    "userId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "workspaceId"),
    CONSTRAINT "workspaces_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "workspaces_users_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
