import axios from "../config/axios";

export const getUserSubscription = async (userId) => {
  const res = await axios.get(`/subscriptions/${userId}`);
  return res.data;
};

export const cancelOrResub = async (subId, cancel) => {
  const res = await axios.post(`/subscriptions/${subId}/cancel?cancel=${cancel}`);
  return res.data;
};

export const changePlan = async (subId, priceId) => {
  const res = await axios.post(`/subscriptions/${subId}/change-plan`, {
    priceId,
  });
  return res.data;
};
