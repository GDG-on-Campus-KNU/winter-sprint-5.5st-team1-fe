import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layouts/MainLayout";
import HomePage from "./pages/home/HomePage";
import ProductPage from "./pages/product/ProductPage";
import ProductDetailPage from "./pages/product/ProductDetailPage";
import OrderPage from "./pages/order/OrderPage";
import OrderCompletePage from "./pages/order/OrderCompletePage";
import CartPage from "./pages/CartPage";
import ManagePage from "./pages/AdminProductPage";
import ProductCreatePage from "./pages/admin/ProductCreatePage";
import ProductEditPage from "./pages/admin/ProductEditPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order/complete/:orderId" element={<OrderCompletePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin/product" element={<ManagePage />} />
        <Route path="/admin/product/new" element={<ProductCreatePage />} />
        <Route path="/admin/product/:id" element={<ProductEditPage />} />
      </Route>
    </Routes>
  );
}

export default App;
