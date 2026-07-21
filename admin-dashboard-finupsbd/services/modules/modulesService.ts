/* eslint-disable @typescript-eslint/no-explicit-any */


const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL




export const addLoan = async (formdata: any) => {
    try {
        const res = await fetch(`${baseUrl}/super-admin/loans`, {
            method: "POST",
            body: formdata
        })
        return res.json()
    } catch (error) {
    }
}



export const addCard = async (formdata: any) => {
    try {
        const res = await fetch(`${baseUrl}/super-admin/cards`, {
            method: "POST",
            body: formdata
        })
        return res.json()
    } catch (error) {
    }
}


export type TQueryPayloadType = {
  searchTerm?: string;
  module: string; // or TModules
  isActive?: boolean;
  page?: number;
  limit?: number;
};




export const getAllModules = async (query: Record<string, any>) => {
  try {
    // Remove empty, null, undefined, "" and "all"
    const cleanedFilters: Record<string, string> = {};

    Object.entries(query).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "all"
      ) {
        cleanedFilters[key] = String(value);
      }
    });

    // Query string create
    const queryString = new URLSearchParams(cleanedFilters).toString();
    // API URL
    const url = `${baseUrl}/super-admin/dashboard/modules?${queryString}`;

    // Fetch request
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const result = await res.json();
    return result.data; // same as your existing pattern
  } catch (error) {
    console.error("getAllModules Error:", error);
  }
};

export const getSingleCard = async (id: string) => {
  const res = await fetch(`${baseUrl}/super-admin/cards/${id}`);
  const json = await res.json();
  if (!json.success) throw new Error("Card not found");
  return json.data;
};

export const getSingleLoan = async (id: string) => {
  const res = await fetch(`${baseUrl}/super-admin/loans/${id}`);
  const json = await res.json();
  if (!json.success) throw new Error("Loan not found");
  return json.data;
};
