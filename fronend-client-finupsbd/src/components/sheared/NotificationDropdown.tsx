// components/NotificationDropdown.tsx

"use client";

import * as React from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type NotificationType =
    | "INFO"
    | "SUCCESS"
    | "WARNING"
    | "ERROR"
    | "PROMOTION"
    | "SYSTEM";

interface Notification {
    id: string;
    title: string;
    message: string;
    type: NotificationType;
    actionUrl?: string;
    isRead: boolean;
    createdAt: string;
}          

interface Props {
    notifications: Notification[];
    onMarkRead?: (id: string) => void;
}

const typeColors: Record<NotificationType, string> = {
    INFO: "bg-blue-500",
    SUCCESS: "bg-green-500",
    WARNING: "bg-yellow-500",
    ERROR: "bg-red-500",
    PROMOTION: "bg-purple-500",
    SYSTEM: "bg-gray-500",
};

export function NotificationDropdown({
    notifications,
    onMarkRead,
}: Props) {
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="relative p-2">
                    <Bell className="h-6 w-6" />
                    {unreadCount > 0 && (
                        <Badge
                            className="absolute -top-1 -right-1 rounded-full text-xs px-1.5 py-0.5"
                            variant="destructive"
                        >
                            {unreadCount}
                        </Badge>
                    )}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 max-h-[400px] overflow-auto">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {notifications.length === 0 && (
                    <div className="p-4 text-center text-muted-foreground">
                        No notifications
                    </div>
                )}

                {notifications.map((notif) => (
                    <Link
                        key={notif.id}
                        href={notif.actionUrl || "#"}
                        className={cn(
                            "flex items-start space-x-2 p-3 rounded hover:bg-muted transition-colors",
                            !notif.isRead && "bg-muted/50"
                        )}
                        onClick={() => onMarkRead?.(notif.id)}
                    >
                        <div
                            className={cn(
                                "flex-shrink-0 w-3 h-3 rounded-full mt-1",
                                typeColors[notif.type]
                            )}
                        ></div>
                        <div className="flex-1">
                            <p className="font-medium text-sm">{notif.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                                {notif.message}
                            </p>
                        </div>
                    </Link>
                ))}

                <DropdownMenuSeparator />
                {/* <Link
                    href="/notifications"
                    className="block px-3 py-2 text-center text-primary hover:underline text-sm"
                >
                    View all notifications
                </Link> */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
