// lib/axios.ts
import axios from 'axios'
import https from 'https'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4001/api/v1',
  withCredentials: true, // if you use cookies for auth
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
})




// Optional: Handle global errors
api.interceptors.response.use((response) => response,(error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized, redirecting...")
    }
    return Promise.reject(error)
  }
)

export default api
