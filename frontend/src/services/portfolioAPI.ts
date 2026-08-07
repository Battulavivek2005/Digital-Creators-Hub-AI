import api from "../api/api";

// Get All Portfolio
export const getPortfolio = async () => {
  const response = await api.get("/portfolio/");
  return response.data;
};

// Get Single Portfolio
export const getSinglePortfolio = async (id: number) => {
  const response = await api.get(`/portfolio/${id}`);
  return response.data;
};

// Add Portfolio
export const createPortfolio = async (data: any) => {
  const response = await api.post("/portfolio/", data);
  return response.data;
};

// Update Portfolio
export const updatePortfolio = async (id: number, data: any) => {
  const response = await api.put(`/portfolio/${id}`, data);
  return response.data;
};

// Delete Portfolio
export const deletePortfolio = async (id: number) => {
  const response = await api.delete(`/portfolio/${id}`);
  return response.data;
};
// Upload Portfolio Image
export const uploadPortfolioImage = async (file: File) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await api.post(
    "/portfolio/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};