import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layouts/MainLayout";
import ProductPage from "./pages/product/ProductPage";
import ProductDetailPage from "./pages/product/ProductDetailPage";
import OrderPage from "./pages/order/OrderPage";
import OrderCompletePage from "./pages/order/OrderCompletePage";
import CartPage from "./pages/CartPage";
import ManagePage from "./pages/admin/AdminProductPage";
import MyPage from "./pages/MyPage";
import Private from "./components/private";
import ProductCreatePage from "./pages/admin/ProductCreatePage";
import ProductEditPage from "./pages/admin/ProductEditPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route
          path="/order/complete/:orderId"
          element={<OrderCompletePage />}
        />
        <Route
          path="/cart"
          element={
            <Private>
              <CartPage />
            </Private>
          }
        />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/admin/product" element={<ManagePage />} />
        <Route path="/admin/product/new" element={<ProductCreatePage />} />
        <Route path="/admin/product/:id" element={<ProductEditPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
    </Routes>
  );
}

export default App;
