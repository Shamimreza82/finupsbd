
import { ApplicationStatusForm, TApplicationData } from "@/components/application/application-status/application-status-page";
import BankingArrangementLetter from "@/components/pdf/components/ArrangementLetter";
import { getApplication } from "@/services/applications/userApplication"
import { notFound } from "next/navigation"




const ApplicationStatusPage = async (props: { params: Promise<{ id: string }> }) => {
    const { id } = await props.params


    let appData: TApplicationData | null = null;

    

    try {
        const res = await getApplication(id);
        appData = res?.data as TApplicationData ?? null;
    } catch (err) {
        console.error("getApplication failed:", err);
    }

    if (!appData) {
        // 404 page
        notFound();
    }



    return (
        <div>
            <ApplicationStatusForm applicationData={appData} />
        </div>
    )
}

export default ApplicationStatusPage


