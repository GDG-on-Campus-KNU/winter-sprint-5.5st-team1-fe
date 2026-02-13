import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layouts/MainLayout";
import HomePage from "./pages/home/HomePage"
import ProductPage from "./pages/product/ProductPage";
import ProductDetailPage from "./pages/product/ProductDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;