-- DropForeignKey
ALTER TABLE "ApplicationEvent" DROP CONSTRAINT "ApplicationEvent_applicationId_fkey";

-- AddForeignKey
ALTER TABLE "ApplicationEvent" ADD CONSTRAINT "ApplicationEvent_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "loanApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
