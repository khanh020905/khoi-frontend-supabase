"use client";

import { Users, Library, Activity, Star } from "lucide-react";
import StatCard from "@/components/admin/StatCard";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Users", value: "2,543", icon: Users, trend: "+12% this month", trendUp: true },
    { title: "Vocabulary Words", value: "842", icon: Library, trend: "+24 this week", trendUp: true },
    { title: "Active Lessons", value: "15", icon: Activity, trend: "Stable", trendUp: true },
    { title: "Avg. User Score", value: "86%", icon: Star, trend: "+2.1% from last month", trendUp: true },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
        <p className="text-sm text-muted mt-1">Welcome to the FluentFlow content management system.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: "New user registered", detail: "john.doe@example.com", time: "2 minutes ago" },
            { action: "Vocabulary added", detail: "'Resilience' by Admin", time: "1 hour ago" },
            { action: "Lesson updated", detail: "'Everyday Conversations'", time: "3 hours ago" },
            { action: "New user registered", detail: "sarah.smith@example.com", time: "5 hours ago" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0 last:pb-0">
              <div>
                <p className="text-sm font-semibold text-foreground">{activity.action}</p>
                <p className="text-xs text-muted">{activity.detail}</p>
              </div>
              <span className="text-xs text-muted">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
