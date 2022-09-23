/*
  Warnings:

  - You are about to drop the `ContestsToTasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupsToUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SolvedTask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `isAdmin` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `contests` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ContestsToTasks";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "GroupsToUsers";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SolvedTask";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "solves" (
    "user_id" INTEGER NOT NULL,
    "task_id" INTEGER NOT NULL,
    "time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("user_id", "task_id"),
    CONSTRAINT "solves_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "solves_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "groups_users" (
    "user_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,

    PRIMARY KEY ("user_id", "group_id"),
    CONSTRAINT "groups_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "groups_users_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "contests_tasks" (
    "contest_id" INTEGER NOT NULL,
    "task_id" INTEGER NOT NULL,

    PRIMARY KEY ("contest_id", "task_id"),
    CONSTRAINT "contests_tasks_contest_id_fkey" FOREIGN KEY ("contest_id") REFERENCES "contests" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "contests_tasks_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "fio" TEXT,
    "is_admin" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_users" ("fio", "id", "username") SELECT "fio", "id", "username" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
CREATE TABLE "new_contests" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_contests" ("description", "id", "name") SELECT "description", "id", "name" FROM "contests";
DROP TABLE "contests";
ALTER TABLE "new_contests" RENAME TO "contests";
CREATE TABLE "new_tasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "flag" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_tasks" ("category", "cost", "description", "flag", "id", "name") SELECT "category", "cost", "description", "flag", "id", "name" FROM "tasks";
DROP TABLE "tasks";
ALTER TABLE "new_tasks" RENAME TO "tasks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
