import Header from "../../components/header";
import { Footer } from "../../components/footer";
import { Outlet } from "react-router-dom";
export const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-pink-500/3">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
