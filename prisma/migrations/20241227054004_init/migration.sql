-- CreateTable
CREATE TABLE "Entry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "thoughts" TEXT NOT NULL,
    "feelings" TEXT NOT NULL,
    "behaviors" TEXT NOT NULL,
    "coreBeliefs" TEXT NOT NULL
);
