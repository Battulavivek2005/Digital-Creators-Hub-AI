import React from "react";

interface ViewContactModalProps {
  open: boolean;
  contact: any;
  onClose: () => void;
}

export default function ViewContactModal({
  open,
  contact,
  onClose,
}: ViewContactModalProps) {
  if (!open || !contact) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-2xl rounded-2xl bg-[#0D1224] border border-white/10 p-8 text-white">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Contact Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-600 px-3 py-1 hover:bg-red-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5">

          <div>
            <p className="text-white/50 text-sm">Name</p>
            <p className="font-semibold">{contact.name}</p>
          </div>

          <div>
            <p className="text-white/50 text-sm">Email</p>
            <p>{contact.email}</p>
          </div>

          <div>
            <p className="text-white/50 text-sm">Phone</p>
            <p>{contact.phone || "-"}</p>
          </div>

          <div>
            <p className="text-white/50 text-sm">Service</p>
            <p>{contact.subject}</p>
          </div>

          <div>
            <p className="text-white/50 text-sm">Status</p>
            <p>{contact.status}</p>
          </div>

          <div>
            <p className="text-white/50 text-sm">Message</p>

            <div className="mt-2 rounded-xl bg-[#1A2238] p-4">
              {contact.message}
            </div>
          </div>

        </div>

        <div className="mt-8 flex justify-end">

          <button
            onClick={onClose}
            className="rounded-xl bg-blue-600 px-6 py-3 hover:bg-blue-700"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}