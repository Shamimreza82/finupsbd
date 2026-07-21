"use client"

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { PRODUCT_TYPES } from "@/types/applicationTypes/qyeryTypes";

const STATUS_OPTIONS = [
  { value: "ALL", label: "All Status" },
  { value: "SUBMITTED", label: "Submitted" },
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
  { value: "COMPLETED", label: "Completed" },
] as const;

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
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const productTypeRef = useRef(productType);
  const statusRef = useRef(status);
  productTypeRef.current = productType;
  statusRef.current = status;

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onFilterChange({ searchTerm, productType: productTypeRef.current, status: statusRef.current });
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [searchTerm, onFilterChange]);

  return (
    <div className="flex flex-col gap-4 md:flex-row">
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

      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          value={productType}
          onValueChange={(value) => {
            setProductType(value);
            onFilterChange({ searchTerm, productType: value, status });
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Product Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Products</SelectItem>
            {PRODUCT_TYPES.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={status}
          onValueChange={(value) => {
            setStatus(value);
            onFilterChange({ searchTerm, productType, status: value });
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
