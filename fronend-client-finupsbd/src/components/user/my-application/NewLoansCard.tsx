// components/LoanCard.tsx
'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatDate } from '@/utils';
import Image from 'next/image';

type LoanCardProps = {
  id: string;
  image: string
  applicationId: string;
  loanAmount: number;
  tenure: number;
  interestRate: string;
  applicationOn: string;
  status: string;
};

export const NewLoanCards = ({
  id,
  applicationId,
  loanAmount,
  image,
  tenure,
  interestRate,
  applicationOn,
  status,
}: LoanCardProps) => {
  return (
    <Card className="w-full max-w-sm rounded-xl shadow-md border">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Image height={150} width={150} src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${image}`} alt="Finups BD" className="" />
          <CardTitle className="text-base font-semibold text-gray-800">Finups BD</CardTitle>
        </div>
        <p className="text-sm font-medium text-gray-900">Instant Loan</p>
        <Badge className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full mt-2 w-fit">
          {status}
        </Badge>
      </CardHeader>

      <CardContent className="text-sm space-y-1 text-gray-700">
        <p>
          <span className="font-medium">Application ID:</span>{' '}
          <span className="text-green-600 font-semibold">{applicationId}</span>
        </p>
        <p>
          <span className="font-medium">Loan Amount:</span>{' '}
          <span className="text-green-600 font-semibold">BDT {loanAmount.toLocaleString()}</span>
        </p>
        <p>
          <span className="font-medium">Tenure:</span>{' '}
          <span className="text-green-600 font-semibold">{tenure} Months</span>
        </p>
        <p>
          <span className="font-medium">Interest rate:</span>{' '}
          <span className="text-green-600 font-semibold">{interestRate}</span>
        </p>
        <p>
          <span className="font-medium">Application on:</span>{' '}
          <span className="text-green-600 font-semibold">{formatDate(applicationOn)}</span>
        </p>
      </CardContent>

      <CardFooter>
        <Link href={`/user/my-application/application-status/${id}`} className="w-full">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
