import axios from "axios";

const API_URL = "/api";

export const templateService = {
  upload: (formData: FormData) => axios.post(`${API_URL}/templates/upload`, formData),
  getAll: () => axios.get(`${API_URL}/templates`),
};

export const contentService = {
  upload: (data: any) => axios.post(`${API_URL}/content/upload`, data),
  getAll: () => axios.get(`${API_URL}/content`),
};

export const resumeService = {
  generate: (data: { templateId: string; contentId: string }) =>
    axios.post(`${API_URL}/resume/generate`, data),
  get: (id: string) => axios.get(`${API_URL}/resume/${id}`),
  update: (id: string, data: any) => axios.post(`${API_URL}/resume/${id}`, data),
  delete: (id: string) => axios.delete(`${API_URL}/resume/${id}`),
  download: (id: string) => axios.get(`${API_URL}/resume/${id}/download`),
};
