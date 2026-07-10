/*
  Warnings:

  - Changed the type of `category` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "category",
ADD COLUMN     "category" TEXT NOT NULL;

-- DropEnum
DROP TYPE "PostCategory";

-- CreateIndex
CREATE INDEX "Post_category_idx" ON "Post"("category");
