-- CreateTable
CREATE TABLE "Entry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "situation" TEXT NOT NULL,
    "thoughts" TEXT NOT NULL,
    "feelings" TEXT NOT NULL,
    "pleasantness" INTEGER NOT NULL,
    "unpleasantness" INTEGER NOT NULL,
    "behaviors" TEXT NOT NULL,
    "coreBeliefs" TEXT NOT NULL
);
