import { useState, useEffect } from "react";
import { userInfo } from "@/services/UserData";



export interface TLoanRequest {
  id: string
  bankName: string
  bankImage: string
  loanType: string
  amount: string
  eligibleLoan: string
  interestRate: string
  periodMonths: number
  processingFee: string
}



export function useLoanRequestData() {
   const [loanRequest, setLoanRequest] = useState<TLoanRequest>()
   const [isLoading, setIsLoading] = useState(true)
 

 
   useEffect(() => {
     const LoanRequet = () => {
       const result = localStorage.getItem("loanRequest")
       if (result) {
         setLoanRequest(JSON.parse(result))
         setIsLoading(false)
       } 
     }
     LoanRequet()
   }, [])

  return { loanRequest, isLoading};
}
