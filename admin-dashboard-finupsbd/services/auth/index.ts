"use server"


import api from "@/lib/axios";
import { DecodedUser } from "@/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL



export const getCurrentUser = async (): Promise<DecodedUser | null> => {
    const accessToken = (await cookies()).get("accessToken")?.value;
    if (!accessToken) return null;

    try {
        const decodedData = jwtDecode<DecodedUser>(accessToken);
        return decodedData;
    } catch (error) {
        console.error("Token decoding failed:", error);
        return null;
    }
};



export const loginUser = async (payload: any) => {
    try {
        const res = await api.post('/auth/login', payload)
        if (res.data?.success) {
            const cookieStore = await cookies()
            cookieStore.set("accessToken", res.data?.data?.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            })
        }
        return res.data
    } catch (error) {
        throw error
    }
}


export const logout = async () => {
    const cookieStore = await cookies()
    cookieStore.delete("accessToken")
}





