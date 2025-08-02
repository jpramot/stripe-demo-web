import { BrowserRouter, Route, Routes } from "react-router";
import ProductPage from "../page/ProductPage/ProductPage";
import SuccessOrderPage from "../page/SuccessOrderPage/SuccessOrderPage";
import CancelOrderPage from "../page/CancelOrderPage/CancelOrderPage";
import OrderPage from "../page/OrderPage/OrderPage";
import SubscriptionPage from "../page/SubScriptionPage/SubscriptionPage";

export default function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/checkout/success" element={<SuccessOrderPage />} />
          <Route path="/checkout/cancel" element={<CancelOrderPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/subscriptions" element={<SubscriptionPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
