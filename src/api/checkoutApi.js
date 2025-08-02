import axios from "../config/axios";

export const checkStatusPayment = async (sessionId) => {
  const res = await axios.get(`/checkout/status/${sessionId}`);
  return res.data;
};
