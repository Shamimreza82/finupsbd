"use client";

import type React from "react";

import { buttonVariants } from "@/components/ui/button";
import { useFormContext } from "@/context/loan-application-form-context";
import { cn } from "@/lib/utils";
import { AlertCircle, Lock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoChecklist } from "react-icons/go";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ReactNode;
    step?:
    | "personalInfo"
    | "residentialInfo"
    | "employmentInfo"
    | "loanInfo"
    | "loanRequest"
    | "documentInfo"
    | "guarantorInfo";
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  const { isStepCompleted, isFormSubmitted, isStepEditable } = useFormContext();

  return (
    <nav
      className={cn(
        "flex flex-wrap justify-center gap-2 px-2 sm:justify-start sm:gap-3 md:flex-nowrap md:justify-evenly lg:flex-col lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => {
        const isActive = pathname === item.href;
        const isCompleted = item.step
          ? isStepCompleted(item.step as any)
          : false;
        const isEditable = item.step ? isStepEditable(item.step as any) : true;

        if (item.step && !isEditable) {
          return (
            <div
              key={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "cursor-not-allowed justify-start gap-2 text-sm sm:text-base lg:py-4",
                className
              )}
            >
              {item.icon}
              {item.title}
              <div className="ml-auto">
                <Lock className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              isActive
                ? "border-l-4 bg-green-lighter text-primary hover:bg-green-lighter hover:text-primary"
                : "hover:bg-transparent hover:bg-green-lighter",
              "justify-start gap-2 text-sm sm:text-base lg:py-5 [&_svg]:size-5",
              className
            )}
          >
            {item.icon}
            {item.title}
            {item.step && (
              <div className="ml-auto">
                {isCompleted ? (
                  <GoChecklist className="!size-6 text-primary" />
                ) : (
                  <AlertCircle className="!size-5 text-muted-foreground text-red-500" />
                )}
              </div>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
