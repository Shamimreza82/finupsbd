
import { getAllExistingsLoans, getAllNewLoans, getAllRejectsLoans } from '@/services/applications/userApplication';
import { getCurrentUser } from '@/services/AuthService';

import React from 'react'
import LoanApplicationTable from './LoanApplicationTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoanStatus } from '@/contants';
import { NewLoanCards } from './NewLoansCard';
import { TNewLoanTypes } from '@/types/applications';

const MyApplicationLoan = async () => {

  const user = await getCurrentUser()

  const newLoans = await getAllNewLoans(user?.userId ?? "")
  const existingLoans = await getAllExistingsLoans(user?.userId ?? "")
 const rejectedLoans = await getAllRejectsLoans(user?.userId ?? "")


  return (
    <div className='p-6'>
      <div className='mb-4'>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Applications</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here you can view and track all of your loan applications
        </p>
      </div>
      <Tabs defaultValue="newLoan" >
        <TabsList className='w-[40%] mb-2 gap-2'>
          <TabsTrigger className='w-1/2' value="newLoan">New Loans</TabsTrigger>
          <TabsTrigger className='w-1/2' value="existingLoan">Existing Loan</TabsTrigger>
          <TabsTrigger className='w-1/2 bg-red-600 text-white' value="rejects">Rejected Loan</TabsTrigger>
        </TabsList>
        <TabsContent value="newLoan">
          {/* <div className='grid grid-cols-3 gap-5'>
            {
              newLoans.data?.map((loan: TNewLoanTypes) => (
                <NewLoanCards
                  key={loan.id}
                  id={loan.id}
                  applicationId={loan.applicationId}
                  image={loan.eligibleLoanOffer.bankImage}
                  loanAmount={Number(loan.loanRequest.loanAmount)}
                  interestRate={loan.eligibleLoanOffer.interestRate}
                  tenure={loan.loanRequest.loanTenure}
                  applicationOn={loan.createdAt}
                  status={loan?.status}
                />
              ))
            }
          </div> */}
          <LoanApplicationTable data={newLoans} />
        </TabsContent>
        <TabsContent value="existingLoan">
           <LoanApplicationTable data={existingLoans} />
        </TabsContent>
        <TabsContent value="rejects">
           <LoanApplicationTable data={rejectedLoans} />
        </TabsContent>
      </Tabs>

    </div>
  )
}

export default MyApplicationLoan
