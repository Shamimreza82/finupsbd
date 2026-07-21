'use client'


import { UsersFilter } from "@/components/super-admin/users/users-filter"
import { Button } from "@/components/ui/button"
import UserTable from "@/components/users/UserTable"
import { UserPlus } from "lucide-react"

export default function UsersPage() {
  
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <Button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>



      {/* Data Table */}
      <UserTable/>
    </div>
  );
}
