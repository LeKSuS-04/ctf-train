-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "allow_registration" BOOLEAN NOT NULL DEFAULT false,
    "users_active_by_default" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_settings" ("allow_registration", "id") SELECT "allow_registration", "id" FROM "settings";
DROP TABLE "settings";
ALTER TABLE "new_settings" RENAME TO "settings";
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "fio" TEXT,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_users" ("fio", "id", "is_admin", "password_hash", "username") SELECT "fio", "id", "is_admin", "password_hash", "username" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
