import axios from "axios";

const API_URL = "http://localhost:3004/items";

export const fetchData = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteOffer = async (id) => {
  return await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

export const updateOffer = async (id, newOffer) => {
  return await axios.put(`${API_URL}/${id}`, newOffer);
};

export const addOffer = async (newOffer) => {
  return await axios.post(API_URL, newOffer);
};
