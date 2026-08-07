import api from "../api/api";

export const getTestimonials = async () => {
  const response = await api.get("/testimonials/");
  return response.data;
};

export const getSingleTestimonial = async (id: number) => {
  const response = await api.get(`/testimonials/${id}`);
  return response.data;
};

export const createTestimonial = async (data: any) => {
  const response = await api.post("/testimonials/", data);
  return response.data;
};

export const updateTestimonial = async (id: number, data: any) => {
  const response = await api.put(`/testimonials/${id}`, data);
  return response.data;
};

export const deleteTestimonial = async (id: number) => {
  const response = await api.delete(`/testimonials/${id}`);
  return response.data;
};

// Upload Testimonial Image
export const uploadTestimonialImage = async (file: File) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await api.post(
    "/testimonials/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};