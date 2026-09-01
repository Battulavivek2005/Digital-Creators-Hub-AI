import { useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Briefcase,
  FolderOpen,
  MessageSquare,
  Star,
  LogOut,
} from "lucide-react";

type AdminSidebarProps = {
  active?: string;
};

export default function AdminSidebar({
  active = "",
}: AdminSidebarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate({
      to: "/admin/login",
    });
  };

  const getButtonClass = (name: string) => {
    if (active === name) {
      return "flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3";
    }

    return "flex w-full items-center gap-3 rounded-lg px-4 py-3 hover:bg-white/10";
  };

  return (
    <aside className="w-64 shrink-0 border-r border-white/10 bg-[#0D1224] p-6">
      <h1 className="mb-10 text-2xl font-bold">
        DCH Admin
      </h1>

      <nav className="space-y-3">

        {/* Dashboard */}
        <button
          type="button"
          onClick={() =>
            navigate({
              to: "/admin/dashboard",
            })
          }
          className={getButtonClass("dashboard")}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        {/* Services */}
        <button
          type="button"
          onClick={() =>
            navigate({
              to: "/admin/services",
            })
          }
          className={getButtonClass("services")}
        >
          <Briefcase size={20} />
          Services
        </button>

        {/* Portfolio */}
        <button
          type="button"
          onClick={() =>
            navigate({
              to: "/admin/portfolio",
            })
          }
          className={getButtonClass("portfolio")}
        >
          <FolderOpen size={20} />
          Portfolio
        </button>

        {/* Testimonials */}
        <button
          type="button"
          onClick={() =>
            navigate({
              to: "/admin/testimonials",
            })
          }
          className={getButtonClass("testimonials")}
        >
          <Star size={20} />
          Testimonials
        </button>

        {/* Contacts */}
        <button
          type="button"
          onClick={() =>
            navigate({
              to: "/admin/contacts",
            })
          }
          className={getButtonClass("contacts")}
        >
          <MessageSquare size={20} />
          Contacts
        </button>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-12 flex w-full items-center gap-3 rounded-lg px-4 py-3 hover:bg-red-600"
        >
          <LogOut size={20} />
          Logout
        </button>

      </nav>
    </aside>
  );
}