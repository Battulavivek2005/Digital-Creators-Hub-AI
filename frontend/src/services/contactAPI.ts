import api from "../api/api";

export const sendContact = async (data: any) => {
  const response = await api.post("/contact/", data);
  return response.data;
};

export const getContacts = async () => {
  const response = await api.get("/contact/");
  return response.data;
};

export const getSingleContact = async (id: number) => {
  const response = await api.get(`/contact/${id}`);
  return response.data;
};

export const updateContactStatus = async (id: number, data: any) => {
  const response = await api.put(`/contact/${id}`, data);
  return response.data;
};

export const deleteContact = async (id: number) => {
  const response = await api.delete(`/contact/${id}`);
  return response.data;
};