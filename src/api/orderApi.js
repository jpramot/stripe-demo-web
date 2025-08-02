import axios from "../config/axios";

export const createOrder = async (data) => {
  const res = await axios.post("/orders", data);
  return res.data;
};

export const getAllOrders = async () => {
  const res = await axios.get("/orders");
  return res.data;
};

export const payAgain = async (id) => {
  const res = await axios.post(`/orders/${id}/pay-again`);
  return res.data;
};

export const cancelOrder = async (id) => {
  const res = await axios.post(`/orders/${id}/cancel`);
  return res.data;
};

export const createSubOrder = async (id) => {
  const res = await axios.post(`/orders/${id}/subscribe`);
  return res.data;
};
