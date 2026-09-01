import EditTestimonialModal from "@/components/admin/EditTestimonialModal";
import AddTestimonialModal from "@/components/admin/AddTestimonialModal";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  getTestimonials,
  deleteTestimonial,
} from "@/services/testimonialAPI";
import {
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

export const Route = createFileRoute("/admin/testimonials")({
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [selectedTestimonial, setSelectedTestimonial] =
    useState<any>(null);

  const loadTestimonials = async () => {
    try {
      const res = await getTestimonials();

      if (res.success) {
        setTestimonials(res.testimonials);
      }
    } catch (err) {
      console.error("Testimonials Error:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this testimonial?")) return;

    try {
      await deleteTestimonial(id);
      loadTestimonials();
    } catch (err) {
      console.error("Delete Testimonial Error:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#070B18] text-white">

      {/* Shared Admin Sidebar */}
      <AdminSidebar active="testimonials" />

      {/* Main Content */}
      <main className="flex-1 p-10">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold">
              Testimonials
            </h1>

            <p className="mt-2 text-white/60">
              Manage customer testimonials
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Testimonial
          </button>

        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">

          <table className="w-full">

            <thead className="bg-white/5">

              <tr>

                <th className="p-4 text-left">
                  Photo
                </th>

                <th className="p-4 text-left">
                  Client
                </th>

                <th className="p-4 text-left">
                  Company
                </th>

                <th className="p-4 text-left">
                  Rating
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
                    colSpan={6}
                    className="p-8 text-center"
                  >
                    Loading...
                  </td>

                </tr>

              ) : testimonials.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="p-8 text-center text-white/60"
                  >
                    No testimonials found.
                  </td>

                </tr>

              ) : (

                testimonials.map((item) => (

                  <tr
                    key={item.id}
                    className="border-t border-white/10"
                  >

                    {/* Photo */}
                    <td className="p-4">

                      {item.image ? (

                        <img
                          src={item.image}
                          alt={item.client_name}
                          className="h-16 w-16 rounded-full border border-white/10 object-cover"
                        />

                      ) : (

                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#161B2F] text-xs text-white/50">
                          N/A
                        </div>

                      )}

                    </td>

                    {/* Client */}
                    <td className="p-4 font-semibold">
                      {item.client_name}
                    </td>

                    {/* Company */}
                    <td className="p-4">
                      {item.company}
                    </td>

                    {/* Rating */}
                    <td className="p-4 text-yellow-400 font-semibold">
                      {"⭐".repeat(item.rating)}
                    </td>

                    {/* Status */}
                    <td className="p-4">

                      <span className="rounded-full bg-green-600 px-3 py-1 text-xs">
                        {item.status}
                      </span>

                    </td>

                    {/* Actions */}
                    <td className="p-4">

                      <div className="flex justify-center gap-3">

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTestimonial(item);
                            setEditOpen(true);
                          }}
                          className="rounded-lg bg-yellow-500 p-2 hover:bg-yellow-600"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(item.id)
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

      {/* Add Testimonial Modal */}
      <AddTestimonialModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={loadTestimonials}
      />

      {/* Edit Testimonial Modal */}
      <EditTestimonialModal
        open={editOpen}
        testimonial={selectedTestimonial}
        onClose={() => {
          setEditOpen(false);
          setSelectedTestimonial(null);
        }}
        onSuccess={loadTestimonials}
      />

    </div>
  );
}