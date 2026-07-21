"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

type StatusType = "ALL" | "true" | "false"

export function ModulesFilter({
  onFilterChange,
}: {
  onFilterChange: (filters: {
    searchTerm: string
    module: string
    status: boolean | "ALL"
  }) => void
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [module, setModule] = useState("ALL")
  const [status, setStatus] = useState<StatusType>("ALL")



  const handleFilterChange = () => {
    onFilterChange({
      searchTerm,
      module,
      status: status === "ALL" ? "ALL" : status === "true", // convert string to boolean
    })
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {/* Search Input and Button */}
      <div className="flex w-full items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search applications..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleFilterChange}>Search</Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        {/* Module Filter */}
        <Select
          value={module}
          onValueChange={(value) => {
            setModule(value)
            onFilterChange({
              searchTerm,
              module: value,
              status: status === "ALL" ? "ALL" : status === "true",
            })
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Product Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Products</SelectItem>
            <SelectItem value="PERSONAL_LOAN">Personal Loan</SelectItem>
            <SelectItem value="HOME_LOAN">Home Loan</SelectItem>
            <SelectItem value="CAR_LOAN">Car Loan</SelectItem>
            <SelectItem value="SME_LOAN">SME Loan</SelectItem>
            <SelectItem value="INSTANT_LOAN">Instant Loan</SelectItem>
            <SelectItem value="CREDIT_CARD">Credit Card</SelectItem>
            <SelectItem value="PREPAID_CARD">Prepaid Card</SelectItem>
            <SelectItem value="TRAVEL_CARD">Travel Card</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select
          value={status}
          onValueChange={(value) => {
            setStatus(value as StatusType)
            onFilterChange({
              searchTerm,
              module,
              status: value === "ALL" ? "ALL" : value === "true",
            })
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="true">Active</SelectItem>
            <SelectItem value="false">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
