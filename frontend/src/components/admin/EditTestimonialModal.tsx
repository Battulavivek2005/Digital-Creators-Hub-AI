import { useEffect, useState } from "react";
import {
  updateTestimonial,
  uploadTestimonialImage,
} from "@/services/testimonialAPI";

type Props = {
  open: boolean;
  testimonial: any;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditTestimonialModal({
  open,
  testimonial,
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

  const [status, setStatus] = useState("Active");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (testimonial) {
      setClientName(testimonial.client_name || "");
      setCompany(testimonial.company || "");
      setDesignation(testimonial.designation || "");
      setReview(testimonial.review || "");
      setRating(testimonial.rating || 5);

      setImage(testimonial.image || "");
      setPreview(testimonial.image || "");

      setStatus(testimonial.status || "Active");
    }
  }, [testimonial]);

  if (!open || !testimonial) return null;

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

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await updateTestimonial(testimonial.id, {
        client_name: clientName,
        company,
        designation,
        review,
        rating,
        image,
        status,
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update testimonial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0D1224] p-8">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Edit Testimonial
        </h2>

        <div className="space-y-4">

          <input
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white outline-none"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />

          <input
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white outline-none"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <input
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white outline-none"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />

          <textarea
            rows={4}
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white outline-none"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <input
            type="number"
            min={1}
            max={5}
            className="w-full rounded-lg bg-[#161B2F] p-3 text-white outline-none"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
                    <div>

            <label className="mb-2 block text-sm text-white">
              Client Photo
            </label>

            {preview ? (
              <img
                src={preview}
                alt="Client Preview"
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