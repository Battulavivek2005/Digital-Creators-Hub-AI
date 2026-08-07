import { useEffect, useState } from "react";
import { updateService } from "@/services/serviceAPI";

type Props = {
  open: boolean;
  service: any;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditServiceModal({
  open,
  service,
  onClose,
  onSuccess,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("Active");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setTitle(service.title || "");
      setDescription(service.description || "");
      setIcon(service.icon || "");
      setImage(service.image || "");
      setStatus(service.status || "Active");
    }
  }, [service]);

  if (!open || !service) return null;

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await updateService(service.id, {
        title,
        description,
        icon,
        image,
        status,
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-lg rounded-2xl bg-[#0D1224] p-8 border border-white/10">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Edit Service
        </h2>

        <div className="space-y-4">

          <input
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            rows={4}
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white outline-none"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />

          <input
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white outline-none"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <select
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg bg-gray-600 px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-2"
          >
            {loading ? "Updating..." : "Update"}
          </button>

        </div>

      </div>
    </div>
  );
}