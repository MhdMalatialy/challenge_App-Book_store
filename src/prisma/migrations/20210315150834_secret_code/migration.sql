-- AlterTable
ALTER TABLE "user" ADD COLUMN     "activated" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "secretCode" (
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "secretCode.email_unique" ON "secretCode"("email");
