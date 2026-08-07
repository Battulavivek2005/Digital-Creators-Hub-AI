import { useState } from "react";
import { createService } from "@/services/serviceAPI";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddServiceModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!title || !description) {
      alert("Title and Description are required.");
      return;
    }

    try {
      setLoading(true);

      await createService({
        title,
        description,
        icon,
        image,
      });

      setTitle("");
      setDescription("");
      setIcon("");
      setImage("");

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="w-full max-w-lg rounded-2xl bg-[#0D1224] p-8 border border-white/10">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Add New Service
        </h2>

        <div className="space-y-4">

          <input
            placeholder="Title"
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white outline-none"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            placeholder="Icon"
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white outline-none"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />

          <input
            placeholder="Image URL"
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white outline-none"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg bg-gray-600 px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>

      </div>

    </div>
  );
}