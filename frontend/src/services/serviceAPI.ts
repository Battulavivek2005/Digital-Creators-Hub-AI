import api from "../api/api";

// Get All Services
export const getServices = async () => {
  const response = await api.get("/services/");
  return response.data;
};

// Get Single Service
export const getService = async (id: number) => {
  const response = await api.get(`/services/${id}`);
  return response.data;
};

// Add Service
export const createService = async (data: any) => {
  const response = await api.post("/services/", data);
  return response.data;
};

// Update Service
export const updateService = async (id: number, data: any) => {
  const response = await api.put(`/services/${id}`, data);
  return response.data;
};

// Delete Service
export const deleteService = async (id: number) => {
  const response = await api.delete(`/services/${id}`);
  return response.data;
};