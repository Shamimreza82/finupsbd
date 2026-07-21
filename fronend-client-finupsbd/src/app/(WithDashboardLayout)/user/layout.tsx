"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/user/dashboard-layout/app-sidebar";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // e.g. "/dashboard/loans/applications"
  const segments = pathname.split("/").filter((seg) => seg !== "");




  const breadcrumbItems = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");

    const isLast = index === segments.length - 1;
    const formatted = segment.replace(/-/g, " ") // convert kebab-case to words .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize words

    return (
      <React.Fragment key={href}>
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage>{formatted}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href={href}>{formatted}</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator />}
      </React.Fragment>
    );
  });



  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="ml-8" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>{breadcrumbItems}</BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="p-12 pt-10">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
