import api from '.'

export const getServices = async () => {
  const response = await api.get("/services");
  return response.data;
}

export const createService = async (serviceData) => {
  const response = await api.post("/services", serviceData);
  return response.data;
}

export const editService = async (serviceId, serviceData) => {
  const response = await api.put(`/services/${serviceId}`, serviceData);
  return response.data;
}

export const deleteService = async (serviceId) => {
  const response = await api.delete(`/services/${serviceId}`);
  return response.data;
}