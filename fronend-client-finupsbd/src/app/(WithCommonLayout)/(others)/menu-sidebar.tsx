"use client";
import { cn } from "@/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PageNavItems } from "./others-page-coonstant";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const MenuSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div>
      <nav className="hidden lg:block">
        <ul>
          {PageNavItems.map((item) => (
            <li
              key={item.href}
              className={cn(
                "border-b border-gray-100 py-2",
                pathname === item.href ? "" : "",
              )}
            >
              <Link
                href={item.href}
                className={cn(
                  "block rounded-lg py-3 pl-4",
                  pathname === item.href
                    ? "border-l-4 border-primary bg-green-lighter font-semibold text-primary"
                    : "",
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="block lg:hidden">
        <Select
          open={openMenu}
          onOpenChange={setOpenMenu}
          onValueChange={(value) => handleNavigation(value)}
        >
          <SelectTrigger className="h-10 w-full border-primary font-semibold capitalize text-tertiary-primary shadow-none focus:ring-0">
            <SelectValue
              placeholder={
                pathname.slice(1).replace(/-/g, " ") || "Select an option"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {PageNavItems.map((item) => (
              <SelectItem key={item.href} value={item.href}>
                {item.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MenuSidebar;
