"use client"


import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"


type TUsersFilterProps = {
  search: string;
  onSearchChange: (value: string) => void;
  role?: string;
  onRoleChange?: (value: string) => void;
  status?: string;
  onStatusChange?: (value: string) => void;
};



export function UsersFilter({
  search,
  onSearchChange,
  role,
  onRoleChange,
  status,
  onStatusChange
}: TUsersFilterProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="flex w-full items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="w-full pl-8"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">

        {/* Role Filter */}
        <Select value={role} onValueChange={onRoleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="super_admin">Super Admin</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
