-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "publishedAt" TIMESTAMP(3),
ALTER COLUMN "createdAt" DROP DEFAULT;
