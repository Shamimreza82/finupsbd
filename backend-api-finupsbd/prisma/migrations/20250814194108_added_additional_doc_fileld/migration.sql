-- AlterTable
ALTER TABLE "loanApplicationForm" ADD COLUMN     "additionalDocumentSubmit" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "additionalDocuments" BOOLEAN NOT NULL DEFAULT false;
