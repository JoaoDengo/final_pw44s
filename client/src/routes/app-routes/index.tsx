import { Layout } from "@/components/layout";
import { RequireAuth } from "@/components/require-auth";
import { HomePage } from "@/pages/home";
import ProductPage from "@/pages/product-page";
import { RegisterPage } from "@/pages/register";
import { Route, Routes } from "react-router-dom";
import UserSales from "@/pages/user-sales";
import SalePage from "@/pages/sale-page";
import ProductListPage from "@/pages/product-list";
import { NotFound } from "@/components/not-found";
import { AboutUs } from "@/pages/AboutUs";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/about-us" element={<AboutUs />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/sale-page" element={<SalePage />} />
          <Route path="/user-sales" element={<UserSales />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
