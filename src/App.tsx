import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Layout } from "./components/layouts/MainLayout";
import HomePage from "./pages/home/HomePage";
import ProductPage from "./pages/product/ProductPage";
import ProductDetailPage from "./pages/product/ProductDetailPage";
import OrderPage from "./pages/OrderPage";
import OrderCompletePage from "./pages/order/OrderCompletePage";
import ProductManagePage from "./pages/admin/ProductManagePage";
import CartPage from "./pages/CartPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/order/complete/:orderId" element={<OrderCompletePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin/products/:id" element={<ProductManagePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
