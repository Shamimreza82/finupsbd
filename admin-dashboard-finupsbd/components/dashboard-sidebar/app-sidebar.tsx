"use client"

import * as React from "react"
// Assuming these are custom components wrapping Shadcn UI elements
import { NavMain } from "@/components/dashboard-sidebar/nav-main"
import { NavProjects } from "@/components/dashboard-sidebar/nav-projects"
import { NavUser } from "@/components/dashboard-sidebar/nav-user"

// Assuming these are custom components based on your UI library
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Import the placeholder data structure
import { navList} from "./navlist"


/**
 * The primary dashboard sidebar component.
 * Features: Branding in header, separated navigation sections, and user profile in footer.
 */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  // Define styles for branding and overall look
  const headerTextClass = "text-xl font-extrabold tracking-tight text-primary"
  const sidebarBgClass = "bg-card border-r border-border min-h-screen" 
  const sectionTitleClass = "px-4 py-2 text-xs font-semibold text-muted-foreground/80 uppercase"

  return (
    // The Sidebar component: collapsible, styled with card background and a border
    <Sidebar collapsible="icon" className={sidebarBgClass} {...props}>
      
      {/* 1. Sidebar Header: Branding */}
      <SidebarHeader className="h-16 flex items-center justify-center p-4 border-b border-border/50">
        {/* Clean Application Title / Logo Placeholder */}
        <div className={headerTextClass}>
         Finupsbd
        </div>
        {/* Optional: Subtle Role Tag (e.g., hidden when collapsed) */}
        {/* <span className="absolute right-2 top-2 px-2 py-0.5 text-xs rounded-full bg-green-500/10 text-green-600">Admin</span> */}
      </SidebarHeader>

      {/* 2. Sidebar Content: Navigation and Projects */}
      <SidebarContent className="flex-1 overflow-y-auto pt-2 pb-4">
        
        {/* Main Navigation Section */}
        <h4 className={sectionTitleClass}>
          Main Menu
        </h4>
        <NavMain items={navList.navMain} />

        {/* --- Visual Separator --- */}
        <div className="my-4 h-px w-[90%] mx-auto bg-border" />

        {/* Projects/Secondary Navigation Section */}
        <h4 className={sectionTitleClass}>
          Projects
        </h4>
        <NavProjects projects={navList.projects} />
      </SidebarContent>

      {/* 3. Sidebar Footer: User Profile/Settings */}
      <SidebarFooter className="border-t border-border p-2">
        {/* User profile component, typically a dropdown/link to settings */}
        <NavUser user={navList.user}/>
      </SidebarFooter>

      {/* 4. Sidebar Rail: The collapsed view element */}
      <SidebarRail />
    </Sidebar>
  )
}