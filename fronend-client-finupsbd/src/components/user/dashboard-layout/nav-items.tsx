"use client";

import { type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavItems({
  items,
}: {
  items: {
    name: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const pathname = usePathname();

  return (
    <div className="px-2 py-1">
      <SidebarMenu>
        {items.map((item) => {
          const isActive =
            pathname === item.url || pathname.startsWith(item.url);

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <Link
                  href={item.url}
                  className={`flex items-center gap-2 rounded-md px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "border-l-4 border-primary bg-[#E7FDE2] text-primary"
                      : "hover:scale-[1.02] hover:bg-slate-100 hover:text-primary"
                  }`}
                >
                  {item.icon && (
                    <item.icon
                      className={`h-5 w-5 ${
                        isActive ? "text-primary" : "text-gray-600"
                      }`}
                    />
                  )}
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </div>
  );
}
