/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

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
import { formatDate, formatEnums } from "@/lib/utils"
import { TPagination } from "@/types/sharedTypes"
import { useModules } from "@/hooks/useModules"
import Loading from "@/components/loading/loading"
import NoDataFound from "@/components/Small-component/NoDataFound"
import { useEffect, useState } from "react"
import { PaginationComponent } from "@/components/Small-component/PaginationComponent"
import { Badge } from "@/components/ui/badge"
import { TModules } from "@/types/applicationTypes/qyeryTypes"
import { ModulesFilter } from "./MobuleFilter"


export type TApiDataType = {
  data: any
  pagination: TPagination
}


  type TLoanStatus = boolean | "ALL"

  type TModuleQuery = {
    searchTerm?: string;
    module?: TModules;
    isActive?: TLoanStatus;
    page?: number;
    limit?: number;
  };
///////////////////////////////////////////////////////////////////////////////////////////////



export function ModuleTable() {

  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<boolean | "ALL">("ALL");
  const [module, setModule] = useState<TModules | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);


  const loans = ["PERSONAL_LOAN", "CAR_LOAN", "HOME_LOAN", "SME_LOAN", "INSTANT_LOAN"]
  const cards = ["CREDIT_CARD", "TRAVEL_CARD", "PREPAID_CARD"]



  const query: TModuleQuery = {
    searchTerm,
    module,
    isActive: status === "ALL" ? "ALL" : status,
    page: currentPage,
    limit: 10,
  };

  // ✅ Pass query directly to API hook
  const { data, isLoading, error } = useModules(query)



  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, status, module]);

  const rows = data?.data || []
  const pagination = data?.pagination


  return (
    <div className="space-y-4">

      {/* FILTER */}
       <ModulesFilter
         onFilterChange={(filters) => {
                  setSearchTerm(filters.searchTerm);
                  setModule(filters.module as TModules);
                  setStatus(filters.status as TLoanStatus);
                }}
      />

      {/* TABLE */}
      <div className="rounded-md border">
       { isLoading ?<Loading />: <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sl no. (Total: {pagination?.total})</TableHead>
              <TableHead>Bank Name</TableHead>
              <TableHead>Module Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Add module</TableHead>
              <TableHead>Updated module</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.length > 0 ? (
              rows.map((r: any, idx: number) => (
                <TableRow key={r.id}>
                  <TableCell>{`${idx + 1 + (currentPage - 1) } `}</TableCell>
                  <TableCell>{formatEnums(r.bankName)}</TableCell>
                  <TableCell>{formatEnums(r?.cardType || r?.loanType)}</TableCell>
                  <TableCell>{r.isActive ? <Badge variant="default">Active</Badge>: <Badge variant="destructive">In Active</Badge>}</TableCell>
                  <TableCell>{formatDate(r.createdAt)}</TableCell>
                  <TableCell>{formatDate(r.updatedAt)}</TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        {cards.includes(r?.cardType || r?.loanType) && (
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/modules/details-view/details-view-card/${r.id}`}>
                              <Eye className="mr-2 h-4 w-4" /> View details
                            </Link>
                          </DropdownMenuItem>
                        )}

                        {loans.includes(r?.cardType || r?.loanType) && (
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/modules/details-view/details-view-loan/${r.id}`}>
                              <Eye className="mr-2 h-4 w-4" /> View details
                            </Link>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <NoDataFound />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>}
      </div>

      {/* PAGINATION */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={pagination?.totalPages}
        onPageChange={setCurrentPage}
        
      />

    </div>
  )
}
