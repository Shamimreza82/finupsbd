"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatEnums } from "@/lib/utils"

type DashboardData = {
  totalEligibility: number
  appliedTotal: number
  todayTotal: number
  todayApplied: number

  genderStats: Record<string, number>
  professionStats: Record<string, number>
  loanTypeStats: Record<string, number>
}

interface Props {
  data: DashboardData
}

export default function EligibilityDashboard({ data }: Props) {
  const statCards = [
    {
      title: "Total Eligibility",
      value: data.totalEligibility,
    },
    {
      title: "Total Applied",
      value: data.appliedTotal,
    },
    {
      title: "Today's Check",
      value: data.todayTotal,
    },
    {
      title: "Today's Applications",
      value: data.todayApplied,
    },
  ]

  return (
    <div className="space-y-10">

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((item, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">
                {item.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold">
                {item.value.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ================= DETAIL SECTIONS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ---------- Gender Stats ---------- */}
        <StatGroupCard
          title="Gender Breakdown"
          stats={data.genderStats}
        />

        {/* ---------- Profession Stats ---------- */}
        <StatGroupCard
          title="Profession Breakdown"
          stats={data.professionStats}
        />

        {/* ---------- Loan Type Stats ---------- */}
        <StatGroupCard
          title="Loan Types"
          stats={data.loanTypeStats}
        />
      </div>
    </div>
  )
}

function StatGroupCard({
  title,
  stats,
}: {
  title: string
  stats: Record<string, number>
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {Object.entries(stats).map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between items-center border-b last:border-none pb-1"
          >
            <p className="text-sm capitalize text-muted-foreground">
              {formatEnums(key)}
            </p>

            <span className="font-semibold">
              {value}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}


