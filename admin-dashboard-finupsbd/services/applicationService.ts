'use server'
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axios";
import { TLoanStatusType } from "@/types/sharedTypes";
import { cookies } from "next/headers";




export const getAllApplications = async (filters: Record<string, any>) => {
  // Remove empty, null, undefined and "all"
  const cleanedFilters: Record<string, string> = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== "ALL"
    ) {
      cleanedFilters[key] = String(value);
    }
  });

  const queryString = new URLSearchParams(cleanedFilters).toString();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/super-admin/application/get-all-application?${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.json();
};







export const getAllUsers = async (filters: Record<string, any>) => {
  // Remove empty, null, undefined and "all"
  const cleanedFilters: Record<string, string> = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== "all"
    ) {
      cleanedFilters[key] = value;
    }
  });

  const queryString = new URLSearchParams(cleanedFilters).toString();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/super-admin/users/get-all-users?${queryString}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  return res.json();
};





export const applicationFeedback = async (id: string, payload: { status: TLoanStatusType, adminNote: string, additionalDocuments: boolean }) => {
  // Build query string from filters


  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/super-admin/application/application-feedback/${id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });
  return res.json()
}




export const getDashboardData = async () => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/super-admin/dashboard/dashboard-home`, {
            method: "GET",
        })
        return res.json()
    } catch (error) {
    }
 
}




export const createApplication = async (data: any) => {
  const response = await axiosInstance.post('/applications', data);
  return response.data;
}

export const getSingleApplication = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/super-admin/application/get-single-application/${id}`
  );
  const json = await res.json();
  if (!json.success) throw new Error("Application not found");
  return json.data;
};

export const getSingleUser = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/super-admin/users/get-single-user/${id}`
  );
  const json = await res.json();
  if (!json.success) throw new Error("User not found");
  return json.data;
};

export const getApplicationEvents = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/super-admin/application/status-events/${id}`
  );
  const json = await res.json();
  if (!json.success) throw new Error("Events not found");
  return json.data;
};

