"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  UserRound,
  TrendingUp,
  TrendingDown,
  Clock,
  ClipboardList,
} from "lucide-react";
import EligibilityDashboard from "./EligibilityDashboard";
import StatusBadge from "@/components/Small-component/StatusBadge";

/* =========================
   Types (matches your payload)
   ========================= */
type LastApplication = {
  status: "PENDING" | "APPROVED" | "REJECTED" | string;
  applicationId: string;
  user: { name: string };
};

type Profile = {
  id: string;
  nameAsNid: string | null;
  nationalIdNumber: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  avatar: string | null;
  address: string | null;
  city: string | null;
  userId: string;
};

type LastUser = {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  profile: Profile | null;
};



type EligibilityStats = {
  totalEligibility: number
  appliedTotal: number
  todayTotal: number
  todayApplied: number

  loanTypeStats: {
    [key: string]: number
  }

  genderStats: {
    [key: string]: number
  }

  professionStats: {
    [key: string]: number
  }
}



export type DashboardData = {
  totalUsers: number;
  totalApplications: number;
  userGrowth: string;         // e.g. "0.00%"
  applicantGrowth: string;    // e.g. "+100%"
  last5Application: LastApplication[];
  last5User: LastUser[];
  eligiblity: EligibilityStats
};

/* =========================
   Helpers
   ========================= */
function isPositive(growth: string) {
  // accepts "+12%", "0.00%", "-3.2%" etc.
  if (!growth) return false;
  if (growth.startsWith("+")) return true;
  if (growth.startsWith("-")) return false;
  // treat "0%" or "0.00%" as neutral (not positive)
  const n = Number(growth.replace("%", ""));
  return n > 0;
}

function growthDelta(g: string) {
  const positive = isPositive(g);
  const neutral = !g || g.replace("%", "") === "0" || g === "0.00%";
  const Icon = positive ? TrendingUp : TrendingDown;
  const color = neutral
    ? "text-muted-foreground"
    : positive
    ? "text-green-600 dark:text-green-500"
    : "text-red-600 dark:text-red-500";

  return (
    <div className={cn("flex items-center gap-1 text-sm", color)}>
      {!neutral ? <Icon size={16} /> : <Clock size={16} />}
      <span className={neutral ? "text-muted-foreground" : undefined}>{g || "0%"}</span>
      <span className="text-muted-foreground">from last month</span>
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return d;
  }
}

/* =========================
   Reusable stat card
   ========================= */
function StatCard(props: {
  title: string;
  value: number | string;
  growth?: string;
  icon?: React.ReactNode;
}) {
  const { title, value, growth, icon } = props;
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-3xl font-semibold tracking-tight">{value}</div>
        {typeof growth === "string" && growthDelta(growth)}
      </CardContent>
    </Card>
  );
}

/* =========================
   Main Component
   ========================= */
export default function DashboardHome({ data }: { data: DashboardData }) {
  const {
    totalUsers,
    totalApplications,
    userGrowth,
    applicantGrowth,
    last5Application,
    last5User,
    eligiblity

  } = data;

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total Applicants"
          value={totalApplications}
          growth={applicantGrowth}
          icon={<ClipboardList className="h-5 w-5" />}
        />
        <StatCard
          title="Total Users"
          value={totalUsers}
          growth={userGrowth}
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          title="Total Eligibility Check"
          value={eligiblity.totalEligibility}
          growth={userGrowth}
          icon={<Users className="h-5 w-5" />}
        />
        

      </div>

      {/* Lists */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Last 5 Applications */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Recent Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {last5Application?.length ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Application ID</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {last5Application.map((app, i) => (
                    <TableRow key={app.applicationId + i}>
                      <TableCell className="font-medium">
                        {app.user?.name ?? "—"}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {app.applicationId}
                      </TableCell>
                      <TableCell className="text-right">
                        <StatusBadge status={app.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <EmptyState
                icon={<ClipboardList className="h-8 w-8" />}
                title="No applications yet"
                description="New applications will appear here."
              />
            )}
          </CardContent>
        </Card>

        {/* Last 5 Users */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <UserRound className="h-5 w-5" />
              Recent Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            {last5User?.length ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {last5User.map((u) => {
                    const photo =
                      u.profile?.avatar && u.profile.avatar !== "null"
                        ? u.profile.avatar
                        : undefined;
                    const fallback = initials(u.name || u.profile?.nameAsNid || "U");
                    return (
                      <TableRow key={u.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              {photo ? (
                                <AvatarImage src={photo} alt={u.name} />
                              ) : (
                                <AvatarFallback>{fallback}</AvatarFallback>
                              )}
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium leading-tight">{u.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {u.profile?.city ? u.profile.city : "—"}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {u.userId}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(u.createdAt)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <EmptyState
                icon={<Users className="h-8 w-8" />}
                title="No users yet"
                description="New signups will show up here."
              />
            )}
          </CardContent>
        </Card>
        {/* Placeholder for a future KPI */}
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Eligibility Check
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
           <EligibilityDashboard data={eligiblity} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* =========================
   Small Empty State
   ========================= */
function EmptyState({
  icon,
  title,
  description,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
      <div className="text-muted-foreground">{icon}</div>
      <div className="text-base font-medium">{title}</div>
      {description ? (
        <div className="max-w-sm text-sm text-muted-foreground">{description}</div>
      ) : null}
    </div>
  );
}
