"use server";

import type { FormData } from "@/context/loan-application-form-context";
import { TLoanRequest } from "@/hooks/useLoanRequestData";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// Your backend API URL and token
const NEXT_PUBLIC_BASE_API = process.env.NEXT_PUBLIC_BASE_API;
const API_TOKEN = process.env.API_TOKEN;

// Check if environment variables are available
if (!NEXT_PUBLIC_BASE_API) {
  console.error("BACKEND_API_URL environment variable is not set");
}


export async function submitApplication(data: FormData, loanRequest: TLoanRequest) {

  const { documentInfo, draftMode, ...textData } = data
  const formData = new FormData();

  
      const fileData = data.documentInfo ?? {};
      const filesArray = Object.entries(fileData)
      .filter(([_, file]) => file) // skip null/undefined
      .map(([key, file]) => ({
        field: key,
        ...(typeof file === "object" && file !== null ? file : {}),
      })) as Array<{ field: string; name: string; type: string; dataUrl: string }>;


    function base64ToFile(dataUrl: string, filename: string, type: string): File {
      const base64 = dataUrl.split(',')[1];
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return new File([bytes], filename, { type });
    }

  filesArray.forEach(({ field, name, type, dataUrl }) => {
    if (!dataUrl) return; // skip incomplete files
    const file = base64ToFile(dataUrl, name, type);
    formData.append("files", file); // field = 'additionalDocuments'
  });





  formData.append("data", JSON.stringify(textData))
  formData.append("loanRequest", JSON.stringify(loanRequest))



  try {
    if (!NEXT_PUBLIC_BASE_API) {
      throw new Error("Backend API URL is not configured");
    }

    const token = (await cookies()).get("accessToken")?.value;

    if (!token) {
      throw new Error("No authentication token found in cookies");
    }

    const response = await fetch(`${NEXT_PUBLIC_BASE_API}/application/create-application`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error Response:", errorData);
      return errorData
    }

    const result = await response.json();

     return result

  } catch (error) {
    console.error("Error submitting application:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to submit application",
    };
  }
}




export async function updateApplication(
  applicationId: string,
  formData: FormData,
) {
  try {
    if (!NEXT_PUBLIC_BASE_API) {
      throw new Error("Backend API URL is not configured");
    }

    // Update data on your backend server
    const response = await fetch(
      `${NEXT_PUBLIC_BASE_API}/application/${applicationId}`,
      {
        method: "PUT", // or PATCH depending on your API
        headers: {
          "Content-Type": "application/json",
          Authorization: API_TOKEN ? `Bearer ${API_TOKEN}` : "",
        },
        body: JSON.stringify(formData),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error Response:", errorData);
      throw new Error(
        errorData.message ||
        `Failed to update application: ${response.status} ${response.statusText}`,
      );
    }

    revalidatePath("/loan-application");
    return { success: true };
  } catch (error) {
    console.error("Error updating application:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update application",
    };
  }
}

export async function getApplication(applicationId: string) {
  try {
    if (!NEXT_PUBLIC_BASE_API) {
      throw new Error("Backend API URL is not configured");
    }

    // Fetch data from your backend server
    const response = await fetch(
      `${NEXT_PUBLIC_BASE_API}/application/${applicationId}`,
      {
        headers: {
          Authorization: API_TOKEN ? `Bearer ${API_TOKEN}` : "",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error Response:", errorData);
      throw new Error(
        errorData.message ||
        `Application not found: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching application:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch application",
    };
  }
}
