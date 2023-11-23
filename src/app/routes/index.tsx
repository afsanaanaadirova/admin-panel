import { useRoutes } from "react-router-dom";
import NotFound from "@/ui/pages/common/NotFound";
import AuthProtectedRoute from "@/app/routes/auth-protected-route";
import MainLayout from "@/ui/layout/MainLayout";
import { lazy } from "react";
import Home from "@/ui/pages/home/home";
import ProductForm from "@/ui/containers/ProductForm";
import CategoryForm from "@/ui/containers/CategoryForm";

const LoginPage = lazy(() => import("@/ui/pages/auth/LoginPage"));
const ProductsPage = lazy(() => import("@/ui/pages/products/ProductsPage"));
const CategoryPage = lazy(() => import("@/ui/pages/category/CategoryPage"));

const AppRoutes = () => {
  const routesConfig = [
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      element: <AuthProtectedRoute />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/products/*",
              children: [
                {
                  index: true,
                  element: <ProductsPage />,
                },
                {
                  path: ":productId",
                  element: <ProductForm />,
                },
              ],
            },
            {
              path: "/addProduct/*",
              children: [
                {
                  index: true,
                  element: <ProductForm />,
                },
              ],
            },
            {
              path: "/categories/*",
              children: [
                {
                  index: true,
                  element: <CategoryPage />,
                },
                {
                  path: ":caregorytId",
                  element: <CategoryForm />,
                },
              ],
            },
            {
              path: "/addCategory/*",
              children: [
                {
                  index: true,
                  element: <CategoryForm />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  const routes = useRoutes(routesConfig);

  return routes;
};

export default AppRoutes;
