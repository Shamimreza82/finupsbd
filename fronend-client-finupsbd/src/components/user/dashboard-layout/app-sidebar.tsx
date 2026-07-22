"use client";


import * as React from "react";

import SiteLogo from "@/components/sheared/SiteLogo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/user/dashboard-layout/nav-main";
import Link from "next/link";
import { navList } from "./dashboard-navlist";
import { NavItems } from "./nav-items";
import { NavProfile } from "./nav-profile";
import { NavUser } from "./nav-user";
import { usePathname } from "next/navigation";





export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  return (
    <div className="z-50 ">
      <Sidebar
        className="w-72 shadow-lg transition-all "
        collapsible="icon"
        {...props}
      >
        {/* Header */}
        <SidebarHeader className="border-b 0 p-4 ">
          <SiteLogo className="w-36" />
        </SidebarHeader>

        {/* Main Content */}
        <SidebarContent className="flex-1 overflow-y-auto">
          {/* Personal Information */}
          <NavProfile projects={navList.profile} />

          {/* My Application */}
          <NavItems items={navList.myItems} />

          {/* Account Settings */}
          <NavMain items={navList.navMain} />
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="border-t border-gray-200 p-4 dark:border-gray-700">
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </div>
  );
}