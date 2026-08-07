import { useEffect, useState } from "react";
import {
  updatePortfolio,
  uploadPortfolioImage,
} from "@/services/portfolioAPI";

type Props = {
  open: boolean;
  portfolio: any;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditPortfolioModal({
  open,
  portfolio,
  onClose,
  onSuccess,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const [projectUrl, setProjectUrl] = useState("");
  const [featured, setFeatured] = useState("No");
  const [status, setStatus] = useState("Active");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (portfolio) {
      setTitle(portfolio.title || "");
      setDescription(portfolio.description || "");
      setCategory(portfolio.category || "");

      setImage(portfolio.image || "");
      setPreview(portfolio.image || "");

      setProjectUrl(portfolio.project_url || "");
      setFeatured(portfolio.featured || "No");
      setStatus(portfolio.status || "Active");
    }
  }, [portfolio]);

  if (!open || !portfolio) return null;

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    try {
      setUploading(true);

      const res = await uploadPortfolioImage(file);

      setImage(res.image_url);
      setPreview(res.image_url);
    } catch (err) {
      console.error(err);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await updatePortfolio(portfolio.id, {
        title,
        description,
        category,
        image,
        project_url: projectUrl,
        featured,
        status,
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update portfolio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0D1224] p-8">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Edit Portfolio
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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
                    <div>

            <label className="mb-2 block text-sm text-white">
              Current Image
            </label>

            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="mb-4 h-44 w-full rounded-xl border border-white/10 object-cover"
              />
            ) : (
              <div className="mb-4 flex h-44 items-center justify-center rounded-xl border border-dashed border-white/20 bg-[#161B2F] text-white/50">
                No Image Available
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full rounded-lg bg-[#161B2F] p-3 text-white"
            />

            {uploading && (
              <p className="mt-2 text-blue-400">
                Uploading image...
              </p>
            )}

          </div>

          <input
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white outline-none"
            value={projectUrl}
            onChange={(e) => setProjectUrl(e.target.value)}
          />

          <select
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white"
            value={featured}
            onChange={(e) => setFeatured(e.target.value)}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>

          <select
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg bg-gray-600 px-5 py-2 hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading || uploading}
            className="rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Updating..."
              : uploading
              ? "Uploading..."
              : "Update"}
          </button>

        </div>

      </div>
    </div>
  );
}