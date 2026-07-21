"use client";

import {
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavItems({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs border-t py-4 font-semibold uppercase text-gray-500">
        My Items
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive =
            pathname === item.url || pathname.startsWith(item.url);

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`
                      mb-3 flex items-center justify-between gap-2 rounded-md px-4 py-3 transition-all duration-300
                      ${isActive
                        ? "border-l-4 border-primary bg-[#E7FDE2] text-primary"
                        : "hover:bg-slate-100 hover:text-primary hover:scale-[1.02]"
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon && (
                        <item.icon
                          className={`h-5 w-5 transition-colors duration-300 ${
                            isActive
                              ? "text-primary"
                              : "text-gray-600 group-hover/collapsible:text-primary"
                          }`}
                        />
                      )}
                      <span className="text-sm font-medium">
                        {item.title}
                      </span>
                    </div>
                    <ChevronRight
                      className={`
                        ml-auto h-4 w-4 shrink-0 transform transition-transform duration-300
                        group-data-[state=open]/collapsible:rotate-90
                        ${isActive ? "text-primary" : "text-gray-500 group-hover/collapsible:text-primary"}
                      `}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent
                  className="overflow-hidden transition-all duration-300 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp"
                >
                  <SidebarMenuSub className="border-none">
                    {item.items?.map((subItem) => {
                      const isSubActive = pathname === subItem.url;
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link
                              href={subItem.url}
                              className={`
                                block rounded-md px-4 py-3 text-sm font-medium transition-all duration-300
                                ${isSubActive
                                  ? "bg-[#E7FDE2] text-primary"
                                  : "hover:bg-slate-200 hover:scale-[1.02] hover:text-primary"
                                }
                              `}
                            >
                              {subItem.title}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
