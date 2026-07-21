"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useUsers } from "@/hooks/useUsers";
import Loading from "../loading/loading";
import NoDataFound from "../Small-component/NoDataFound";
import { UsersFilter } from "../super-admin/users/users-filter";
import { PaginationComponent } from "../Small-component/PaginationComponent";




export type TUser = {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  isActive: boolean;
  createdAt: string;          // ISO string from API
  lastLogin: string | null;   // can be null if never logged in
  profile?: {
    avatar: string | null;
  };
};





export default function UserTable() {

  const [searchTerm, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const page = currentPage


  const { data, isLoading, isError } = useUsers({
    searchTerm,
    page,
    limit: 10,
  });

  const rows = data?.data?.data ?? []
  const pagination = data?.data?.pagination ?? {}

  // 🔹 Error or No Data State
  if (isError) {
    return (
      <NoDataFound
        title="No Users Found"
        reason={
          isError
            ? "The server failed to fetch user data."
            : "There are no users in the system yet."
        }
        suggestion="Try refreshing the page or adding a new user."
        actionLabel="Reload"
        onAction={() => window.location.reload()}
      />
    );
  }

  // 🔹 Success State





  return (
    <div className="w-full space-y-4">
      {/* Filter Section */}
      <UsersFilter search={searchTerm} onSearchChange={setSearch} />
      {isLoading ? <Loading /> :
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Avatar</TableHead>
               <TableHead>User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows?.length > 0 ? (
              rows.map((user: TUser) => (
                <TableRow key={user.id}>
                  <TableCell>
                    {user.profile?.avatar ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${user.profile.avatar}`}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    )}
                  </TableCell>
                   <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "SUPER_ADMIN" ? "default" : "secondary"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.isActive ? "default" : "destructive"}>
                      {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem >
                          <Link href={`/dashboard/users/user-details-view/${user.id}`} className="flex items-center">
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
                <TableCell colSpan={8} className="text-center">
                  User Not Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      }
      <PaginationComponent
        currentPage={currentPage}   // use state, not API pagination
        totalPages={pagination.totalPages ?? 1}
        onPageChange={setCurrentPage} // directly update page
      />
    </div>
  );
}
