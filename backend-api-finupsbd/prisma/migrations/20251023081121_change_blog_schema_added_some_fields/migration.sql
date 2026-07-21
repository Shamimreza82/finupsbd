/*
  Warnings:

  - The values [LOAN] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `coverImage` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `blogs` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('PERSONAL_LOAN', 'HOME_LOAN', 'CAR_LOAN', 'SME_LOAN', 'EDUCATION_LOAN', 'BUSINESS_LOAN', 'FINUPS_AGRIM_LOAN', 'CREDIT_CARD', 'CREDIT_SCORE', 'DEBT_MANAGEMENT', 'DIGITAL_BANKING', 'SAVINGS', 'MONEY_MANAGEMENT', 'INSURANCE', 'TAX_TIPS', 'INVESTMENT', 'FINANCIAL_PLANNING', 'WEALTH_BUILDING', 'FINTECH_NEWS', 'STARTUP_GROWTH', 'PRODUCT_UPDATE', 'CUSTOMER_SUCCESS', 'MARKET_ANALYSIS', 'FRAUD_PREVENTION', 'ECONOMIC_TRENDS', 'FINANCIAL_EDUCATION', 'LIFESTYLE', 'TECH_TIPS', 'CAREER_ADVICE', 'SUCCESS_STORIES', 'LAST', 'OTHER');
ALTER TABLE "blogs" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;

-- AlterEnum
ALTER TYPE "PostStatus" ADD VALUE 'SCHEDULED';

-- DropForeignKey
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_userId_fkey";

-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "coverImage",
DROP COLUMN "userId",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "bannerImage" TEXT,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "scheduledFor" TIMESTAMP(3),
ADD COLUMN     "thumbnail" TEXT,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
