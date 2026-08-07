import { useState } from "react";
import {
  createPortfolio,
  uploadPortfolioImage,
} from "@/services/portfolioAPI";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddPortfolioModal({
  open,
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

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  if (!open) return null;

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));

    try {
      setUploading(true);

      const res = await uploadPortfolioImage(file);

      if (res.success) {
        setImage(res.image_url);
      }
    } catch (err) {
      console.error(err);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !category) {
      alert("Title, Description and Category are required.");
      return;
    }

    try {
      setLoading(true);

      await createPortfolio({
        title,
        description,
        category,
        image,
        project_url: projectUrl,
        featured,
      });

      setTitle("");
      setDescription("");
      setCategory("");
      setImage("");
      setPreview("");
      setProjectUrl("");
      setFeatured("No");

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create portfolio project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0D1224] p-8">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Add Portfolio Project
        </h2>

        <div className="space-y-4"></div>
                  <input
            placeholder="Project Title"
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            rows={4}
            placeholder="Description"
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            placeholder="Category"
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <div>
            <label className="mb-2 block text-sm text-white">
              Portfolio Image
            </label>

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

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 h-44 w-full rounded-xl border border-white/10 object-cover"
              />
            )}
          </div>

          <input
            placeholder="Project URL"
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

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg bg-gray-600 px-5 py-2 hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading || uploading}
            className="rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : uploading
              ? "Uploading..."
              : "Save"}
          </button>

        </div>

      </div>
);
}