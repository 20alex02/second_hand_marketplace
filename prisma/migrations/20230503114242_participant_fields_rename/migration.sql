/*
  Warnings:

  - You are about to drop the column `joinTime` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `leftTime` on the `Participant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "joinTime",
DROP COLUMN "leftTime",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3);
