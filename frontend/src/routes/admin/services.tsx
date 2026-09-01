import EditServiceModal from "@/components/admin/EditServiceModal";
import AddServiceModal from "@/components/admin/AddServiceModal";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  getServices,
  deleteService,
} from "@/services/serviceAPI";
import {
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

export const Route = createFileRoute("/admin/services")({
  component: ServicesPage,
});

function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const loadServices = async () => {
    try {
      const res = await getServices();

      if (res.success) {
        setServices(res.services);
      }
    } catch (err) {
      console.error("Services Error:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Delete this service?"
    );

    if (!confirmDelete) return;

    try {
      await deleteService(id);
      loadServices();
    } catch (err) {
      console.error("Delete Service Error:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#070B18] text-white">

      {/* Shared Admin Sidebar */}
      <AdminSidebar active="services" />

      {/* Main Content */}
      <main className="flex-1 p-10">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold">
              Services
            </h1>

            <p className="mt-2 text-white/60">
              Manage all business services
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Service
          </button>

        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">

          <table className="w-full">

            <thead className="bg-white/5">
              <tr>

                <th className="p-4 text-left">
                  Icon
                </th>

                <th className="p-4 text-left">
                  Title
                </th>

                <th className="p-4 text-left">
                  Description
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center"
                  >
                    Loading...
                  </td>
                </tr>

              ) : services.length === 0 ? (

                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-white/60"
                  >
                    No services found.
                  </td>
                </tr>

              ) : (

                services.map((service) => (

                  <tr
                    key={service.id}
                    className="border-t border-white/10"
                  >

                    <td className="p-4">
                      {service.icon}
                    </td>

                    <td className="p-4 font-semibold">
                      {service.title}
                    </td>

                    <td className="p-4">
                      {service.description}
                    </td>

                    <td className="p-4">

                      <span className="rounded-full bg-green-600 px-3 py-1 text-xs">
                        {service.status}
                      </span>

                    </td>

                    <td className="p-4">

                      <div className="flex justify-center gap-3">

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedService(service);
                            setEditOpen(true);
                          }}
                          className="rounded-lg bg-yellow-500 p-2 hover:bg-yellow-600"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(service.id)
                          }
                          className="rounded-lg bg-red-600 p-2 hover:bg-red-700"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </main>

      {/* Add Service Modal */}
      <AddServiceModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={loadServices}
      />

      {/* Edit Service Modal */}
      <EditServiceModal
        open={editOpen}
        service={selectedService}
        onClose={() => {
          setEditOpen(false);
          setSelectedService(null);
        }}
        onSuccess={loadServices}
      />

    </div>
  );
}
