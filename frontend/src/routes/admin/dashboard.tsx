import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { getDashboard } from "@/services/dashboardAPI";

export const Route = createFileRoute("/admin/dashboard")({
  component: Dashboard,
});

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-lg">
      <p className="text-sm text-white/60">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-bold text-white">
        {value}
      </h2>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState({
    total_admins: 0,
    total_services: 0,
    total_portfolio: 0,
    total_testimonials: 0,
    total_contacts: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboard();

      if (res.success) {
        setStats(res.dashboard);
      }
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#070B18] text-white">

      {/* Shared Admin Sidebar */}
      <AdminSidebar active="dashboard" />

      {/* Main Content */}
      <main className="flex-1 p-10">

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-white/60">
          Welcome back to Digital Creators Hub
        </p>

        {/* Statistics */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Contacts"
            value={stats.total_contacts}
          />

          <StatCard
            title="Services"
            value={stats.total_services}
          />

          <StatCard
            title="Portfolio"
            value={stats.total_portfolio}
          />

          <StatCard
            title="Testimonials"
            value={stats.total_testimonials}
          />

        </div>

        {/* Administrators */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">

          <h2 className="text-2xl font-semibold">
            Total Administrators
          </h2>

          <p className="mt-3 text-5xl font-bold text-blue-400">
            {stats.total_admins}
          </p>

        </div>

      </main>

    </div>
  );
}