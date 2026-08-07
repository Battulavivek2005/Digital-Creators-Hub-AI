interface DeleteContactModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteContactModal({
  open,
  onClose,
  onConfirm,
}: DeleteContactModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0D1224] p-8 text-white">

        <h2 className="text-2xl font-bold mb-4">
          Delete Contact
        </h2>

        <p className="text-white/70">
          Are you sure you want to delete this contact message?
        </p>

        <p className="mt-2 text-red-400 text-sm">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="rounded-lg border border-white/20 px-5 py-2 hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-5 py-2 hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}