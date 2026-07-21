
import { ApplicationsTable } from "@/components/super-admin/applications/applications-table";

const ApplicationsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">All Applications</h1>
      <ApplicationsTable/>
    </div>
  );
};

export default ApplicationsPage;
