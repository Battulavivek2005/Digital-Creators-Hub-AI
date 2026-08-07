import { useState } from "react";
import {
  createTestimonial,
  uploadTestimonialImage,
} from "@/services/testimonialAPI";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddTestimonialModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [clientName, setClientName] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  if (!open) return null;

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    try {
      setUploading(true);

      const res = await uploadTestimonialImage(file);

      setImage(res.image_url);
      setPreview(res.image_url);
    } catch (err) {
      console.error(err);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await createTestimonial({
        client_name: clientName,
        company,
        designation,
        review,
        rating,
        image,
      });

      setClientName("");
      setCompany("");
      setDesignation("");
      setReview("");
      setRating(5);

      setImage("");
      setPreview("");

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add testimonial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0D1224] p-8">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Add Testimonial
        </h2>

        <div className="space-y-4">

          <input
            placeholder="Client Name"
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white outline-none"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />

          <input
            placeholder="Company"
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white outline-none"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <input
            placeholder="Designation"
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white outline-none"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />

          <textarea
            rows={4}
            placeholder="Review"
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white outline-none"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <input
            type="number"
            min={1}
            max={5}
            placeholder="Rating"
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white outline-none"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
                    <div>

            <label className="mb-2 block text-sm text-white">
              Client Photo
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
    </div>
  );
}