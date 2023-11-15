import { useRoutes } from "react-router-dom";
import NotFound from "@/ui/pages/common/NotFound";
import AuthProtectedRoute from "@/app/routes/auth-protected-route";
import MainLayout from "@/ui/layout/MainLayout";
import { lazy } from "react";
import Sidebar from "@/ui/layout/sidebar/Sidebar";
import PostsPage from "@/ui/pages/posts/PostsPage";
import AddProduct from "@/ui/pages/products/AddProduct";
import PostDetailsPage from "@/ui/pages/posts/details/PostDetailsPage";
import EditProduct from "@/ui/pages/products/EditProduct";

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
      path: "/",
      element: <Sidebar />,
    },
    {
      element: <AuthProtectedRoute />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              path: "/posts/*",
              children: [
                {
                  index: true,
                  element: <PostsPage />,
                },
                {
                  path: ":postId",
                  element: <PostDetailsPage />,
                },
              ],
            },
            {
              path: "/products/*",
              children: [
                {
                  index: true,
                  element: <ProductsPage />
                },
                {
                  path: ":productId",
                  element: <EditProduct />
                }
              ]
            },
            {
              path: "/addProduct/*",
              children: [
                {
                  index: true,
                  element: <AddProduct />
                }
              ]
            },
            {
              path: "/categories/*",
              children: [
                {
                  index: true,
                  element: <CategoryPage />
                }
              ]
            }
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
