import AdminSidebar from "@/components/admin/AdminSidebar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  getContacts,
  updateContactStatus,
  deleteContact,
} from "@/services/contactAPI";

export const Route = createFileRoute("/admin/contacts")({
  component: ContactsPage,
});

function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(
    null,
  );

  const loadContacts = async () => {
    try {
      const res = await getContacts();

      if (res.success) {
        setContacts(res.contacts);
      }
    } catch (err) {
      console.error("Contacts Error:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleStatus = async (id: number, status: string) => {
    try {
      await updateContactStatus(id, { status });
      loadContacts();
    } catch (err) {
      console.error("Update Contact Status Error:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this contact message?")) return;

    try {
      await deleteContact(id);
      setSelectedDeleteId(null);
      loadContacts();
    } catch (err) {
      console.error("Delete Contact Error:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#070B18] text-white">

      {/* Shared Admin Sidebar */}
      <AdminSidebar active="contacts" />

      {/* Main Content */}
      <main className="flex-1 p-10">

        <div>
          <h1 className="text-4xl font-bold">
            Contacts
          </h1>

          <p className="mt-2 text-white/60">
            Manage customer contact messages
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">

          <table className="w-full">

            <thead className="bg-white/5">

              <tr>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Phone
                </th>

                <th className="p-4 text-left">
                  Subject
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

              ) : contacts.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="p-8 text-center text-white/60"
                  >
                    No contact messages found.
                  </td>

                </tr>

              ) : (

                contacts.map((item) => (

                  <tr
                    key={item.id}
                    className="border-t border-white/10"
                  >

                    {/* Name */}
                    <td className="p-4 font-semibold">
                      {item.name}
                    </td>

                    {/* Email */}
                    <td className="p-4">
                      {item.email}
                    </td>

                    {/* Phone */}
                    <td className="p-4">
                      {item.phone || "-"}
                    </td>

                    {/* Subject */}
                    <td className="p-4">
                      {item.subject}
                    </td>

                    {/* Status */}
                    <td className="p-4">

                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleStatus(
                            item.id,
                            e.target.value,
                          )
                        }
                        className={`rounded-lg border border-white/10 bg-[#161B2F] px-3 py-2 text-sm outline-none ${
                          item.status === "New"
                            ? "text-blue-400"
                            : item.status === "In Progress"
                              ? "text-yellow-400"
                              : "text-green-400"
                        }`}
                      >

                        <option value="New">
                          New
                        </option>

                        <option value="In Progress">
                          In Progress
                        </option>

                        <option value="Resolved">
                          Resolved
                        </option>

                      </select>

                    </td>

                    {/* Actions */}
                    <td className="p-4 text-center">

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedDeleteId(item.id)
                        }
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>

                      {selectedDeleteId === item.id && (
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(item.id)
                          }
                          className="ml-2 rounded-lg bg-red-800 px-4 py-2 text-sm hover:bg-red-900"
                        >
                          Confirm
                        </button>
                      )}

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}