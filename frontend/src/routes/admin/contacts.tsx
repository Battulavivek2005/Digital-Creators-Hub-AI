import { toast } from "sonner";
import DeleteContactModal from "@/components/admin/DeleteContactModal";
import ViewContactModal from "@/components/admin/ViewContactModal";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import {
  getContacts,
  deleteContact,
  updateContactStatus,
} from "@/services/contactAPI";

import {
  LayoutDashboard,
  Briefcase,
  FolderOpen,
  MessageSquare,
  LogOut,
  Trash2,
} from "lucide-react";

export const Route = createFileRoute("/admin/contacts")({
  component: ContactsPage,
});

function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const loadContacts = async () => {
    try {
      const res = await getContacts();

      if (res.success) {
        setContacts(res.contacts);
      }
    } catch (err) {
      console.error(err);    
    }

    setLoading(false);
  };

  useEffect(() => {
    loadContacts();
  }, []);

const handleDelete = async () => {
  if (selectedDeleteId === null) return;

  try {
    await deleteContact(selectedDeleteId);

    toast.success("Contact deleted successfully!");

    setDeleteOpen(false);
    setSelectedDeleteId(null);

    loadContacts();
  } catch (err) {
    console.error(err);

    toast.error("Failed to delete contact.");
  }
};
const handleStatus = async (id: number, status: string) => {
  try {
    await updateContactStatus(id, { status });

    toast.success("Contact status updated successfully!");

    loadContacts();
  } catch (err) {
    console.error(err);

    toast.error("Failed to update contact status.");
  }
};

  return (
    <div className="flex min-h-screen bg-[#070B18] text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-[#0D1224] border-r border-white/10 p-6">

        <h1 className="text-2xl font-bold mb-10">
          DCH Admin
        </h1>

        <nav className="space-y-3">

          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 hover:bg-white/10">
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 hover:bg-white/10">
            <Briefcase size={20} />
            Services
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 hover:bg-white/10">
            <FolderOpen size={20} />
            Portfolio
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3">
            <MessageSquare size={20} />
            Contacts
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 hover:bg-red-600 mt-12">
            <LogOut size={20} />
            Logout
          </button>

        </nav>

      </aside>

      <main className="flex-1 p-10">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Contacts
          </h1>

          <p className="text-white/60 mt-2">
            Manage customer enquiries
          </p>

        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10">

          <table className="w-full">

            <thead className="bg-white/5">

              <tr>

                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Service</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Actions</th>

              </tr>

            </thead>

            <tbody>
                            {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center">
                    Loading...
                  </td>
                </tr>
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-white/60">
                    No contact messages found.
                  </td>
                </tr>
              ) : (
                contacts.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-white/10"
                  >
                    <td className="p-4 font-semibold">
                      {item.name}
                    </td>

                    <td className="p-4">
                      {item.email}
                    </td>

                    <td className="p-4">
                      {item.phone || "-"}
                    </td>

                    <td className="p-4">
                      {item.subject}
                    </td>

<td className="p-4">

  <span
    className={`inline-block mb-3 rounded-full px-3 py-1 text-xs font-semibold
      ${
        item.status === "New"
          ? "bg-blue-600"
          : item.status === "In Progress"
          ? "bg-yellow-500 text-black"
          : "bg-green-600"
      }`}
  >
    {item.status}
  </span>

  <select
    value={item.status}
    onChange={(e) =>
      handleStatus(item.id, e.target.value)
    }
    className="mt-2 w-full rounded-lg border border-white/10 bg-[#1A2238] px-3 py-2"
  >
    <option value="New">New</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
  </select>

</td>

                    <td className="p-4">
  <div className="flex justify-center gap-3">

    <button
      onClick={() => {
        setSelectedContact(item);
        setViewOpen(true);
      }}
      className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
    >
      View
    </button>

    <button
      onClick={() => {
        setSelectedDeleteId(item.id);
        setDeleteOpen(true);
      }}
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

    <ViewContactModal
      open={viewOpen}
      contact={selectedContact}
      onClose={() => {
        setViewOpen(false);
        setSelectedContact(null);
      }}
    />

    <DeleteContactModal
      open={deleteOpen}
      onClose={() => {
        setDeleteOpen(false);
        setSelectedDeleteId(null);
      }}
      onConfirm={handleDelete}
    />

  </div>
);
}
