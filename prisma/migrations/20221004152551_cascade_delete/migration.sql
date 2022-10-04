-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_groups_users" (
    "user_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,

    PRIMARY KEY ("user_id", "group_id"),
    CONSTRAINT "groups_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "groups_users_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_groups_users" ("group_id", "user_id") SELECT "group_id", "user_id" FROM "groups_users";
DROP TABLE "groups_users";
ALTER TABLE "new_groups_users" RENAME TO "groups_users";
CREATE TABLE "new_solves" (
    "user_id" INTEGER NOT NULL,
    "task_id" INTEGER NOT NULL,
    "time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("user_id", "task_id"),
    CONSTRAINT "solves_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "solves_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_solves" ("task_id", "time", "user_id") SELECT "task_id", "time", "user_id" FROM "solves";
DROP TABLE "solves";
ALTER TABLE "new_solves" RENAME TO "solves";
CREATE TABLE "new_contests_tasks" (
    "contest_id" INTEGER NOT NULL,
    "task_id" INTEGER NOT NULL,

    PRIMARY KEY ("contest_id", "task_id"),
    CONSTRAINT "contests_tasks_contest_id_fkey" FOREIGN KEY ("contest_id") REFERENCES "contests" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "contests_tasks_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_contests_tasks" ("contest_id", "task_id") SELECT "contest_id", "task_id" FROM "contests_tasks";
DROP TABLE "contests_tasks";
ALTER TABLE "new_contests_tasks" RENAME TO "contests_tasks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
