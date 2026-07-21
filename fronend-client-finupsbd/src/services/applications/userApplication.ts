"use server"

import { DecodedUser } from "@/types/user";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { getCurrentUser } from "../AuthService";




const url = process.env.NEXT_PUBLIC_BASE_API




export const getAllNewLoans = async (id: string) => {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
        throw new Error("No authentication token found in cookies");
    }
    try {
        const res = await fetch(`${url}/users/get-all-new-loans/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        return res.json()
    } catch (error) {
        console.error(error)
    }
}




export const getAllExistingsLoans = async (id: string) => {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
        throw new Error("No authentication token found in cookies");
    }
    try {
        const res = await fetch(`${url}/users/get-all-existing-loan/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        return res.json()
    } catch (error) {
        console.error(error)
    }
}


export const getAllRejectsLoans = async (id: string) => {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
        throw new Error("No authentication token found in cookies");
    }
    try {
        const res = await fetch(`${url}/users/get-all-rejects-loan/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        return res.json()
    } catch (error) {
        console.error(error)
    }
}



export const getApplication = async (id: string) => {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
        throw new Error("No authentication token found in cookies");
    }
    try {
        const res = await fetch(`${url}/users/get-application/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        return res.json()
    } catch (error) {
        console.error(error)
    }
}





export const createAppiDoc = async (id: string, fromData: any) => {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
        throw new Error("No authentication token found in cookies");
    }
    try {
        const res = await fetch(`${url}/users/create-addi-doc/${id}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: fromData
        })
        return res.json()
    } catch (error) {
        console.error(error)
    }
}




export const getAgrementDoc = async (id: string) => {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
        throw new Error("No authentication token found in cookies");
    }
    try {
        const res = await fetch(`${url}/users/agreement-doc/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        return res.json()
    } catch (error) {
        console.error(error)
    }
}