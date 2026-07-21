"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export function ApplicationsFilter({
  onFilterChange,
}: {
  onFilterChange: (filters: {
    searchTerm: string;
    productType: string;
    status: string;
  }) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [productType, setProductType] = useState("ALL");
  const [status, setStatus] = useState("ALL");


  const handleFilterChange = () => {
    onFilterChange({ searchTerm, productType, status });
  };


  return (
    <div className="flex flex-col gap-4 md:flex-row">
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
        <Button type="submit" onClick={handleFilterChange}>Search</Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Select
          value={productType}
          onValueChange={(value) => {
            setProductType(value);
            onFilterChange({ searchTerm, productType: value, status });
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

        <Select
          value={status}
          onValueChange={(value) => {
            setStatus(value);
            onFilterChange({ searchTerm, productType, status: value });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="SUBMITTED">Submitted</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
