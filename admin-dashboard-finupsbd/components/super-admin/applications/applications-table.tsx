"use client"

import { useMemo, useState, useCallback } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link"

import StatusBadge from "@/components/Small-component/StatusBadge"
import { formatDate, formatEnums, formatToBDTCurrency } from "@/lib/utils"
import { useApplications } from "@/hooks/useApplications"
import { ApplicationsFilter } from "./applications-filter"
import { TModules } from "@/types/applicationTypes/qyeryTypes"
import { PaginationComponent } from "@/components/Small-component/PaginationComponent"
import { TLoanStatusType } from "@/types/sharedTypes"

export function ApplicationsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<TLoanStatusType | "ALL">("ALL");
  const [module, setModule] = useState<TModules | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const queryFilters = useMemo(() => ({
    page: currentPage,
    limit: 10,
    searchTerm,
    module: module === "ALL" ? undefined : module,
    status: status === "ALL" ? undefined : status,
  }), [currentPage, searchTerm, module, status]);

  const { data, isLoading, isFetching, error } = useApplications(queryFilters);

  const rows = useMemo(() => data?.data?.data ?? [], [data]);
  const pagination = useMemo(() => data?.data?.pagination, [data]);

  const handleFilterChange = useCallback((filters: {
    searchTerm: string;
    productType: string;
    status: string;
  }) => {
    setSearchTerm(filters.searchTerm);
    setModule(filters.productType as TModules);
    setStatus(filters.status as TLoanStatusType | "ALL");
    setCurrentPage(1);
  }, []);

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-red-600 font-medium">Failed to load applications</p>
        <p className="text-sm text-red-500 mt-1">{error.message}</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="rounded-md border">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto" />
          <p className="mt-2 text-sm text-muted-foreground">Loading applications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <ApplicationsFilter onFilterChange={handleFilterChange} />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application ID</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Bank</TableHead>
              <TableHead>Eligible Amount</TableHead>
              <TableHead>Requested Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.applicationId}</TableCell>
                  <TableCell>{application.user?.name}</TableCell>
                  <TableCell>{formatEnums(application.eligibleLoanOffer?.loanType)}</TableCell>
                  <TableCell>{application.eligibleLoanOffer?.bankName?.split(",")[0]}</TableCell>
                  <TableCell>{formatToBDTCurrency(application.eligibleLoanOffer?.eligibleLoan)}</TableCell>
                  <TableCell>{formatToBDTCurrency(application.loanRequest?.loanAmount)}</TableCell>
                  <TableCell>{formatDate(application.createdAt, "MM/DD/YYYY h:mm A")}</TableCell>
                  <TableCell>
                    <StatusBadge status={application.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/application/details-view/${application.id}`} className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" />
                            View details
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  <div className="text-muted-foreground">
                    <p>No applications found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={pagination?.totalPages ?? 1}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
