-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'MEMBER');

-- AlterTable
ALTER TABLE "mst_user" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER';
