/*
  Warnings:

  - Added the required column `pleasantness` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unpleasantness` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "thoughts" TEXT NOT NULL,
    "feelings" TEXT NOT NULL,
    "pleasantness" INTEGER NOT NULL,
    "unpleasantness" INTEGER NOT NULL,
    "behaviors" TEXT NOT NULL,
    "coreBeliefs" TEXT NOT NULL
);
INSERT INTO "new_Entry" ("behaviors", "coreBeliefs", "createdAt", "feelings", "id", "thoughts", "updatedAt") SELECT "behaviors", "coreBeliefs", "createdAt", "feelings", "id", "thoughts", "updatedAt" FROM "Entry";
DROP TABLE "Entry";
ALTER TABLE "new_Entry" RENAME TO "Entry";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
