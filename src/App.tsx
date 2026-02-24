import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layouts/MainLayout";
import HomePage from "./pages/home/HomePage";
import ProductPage from "./pages/product/ProductPage";
import ProductDetailPage from "./pages/product/ProductDetailPage";
import OrderPage from "./pages/order/OrderPage";
import OrderCompletePage from "./pages/order/OrderCompletePage";
import CartPage from "./pages/CartPage";
import ManagePage from "./pages/AdminProductPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route
            path="/order/complete/:orderId"
            element={<OrderCompletePage />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin/product" element={<ManagePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
