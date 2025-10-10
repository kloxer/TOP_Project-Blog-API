-- AlterTable
ALTER TABLE "public"."Post" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Post_id_seq";
