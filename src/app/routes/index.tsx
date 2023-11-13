import { useRoutes } from "react-router-dom";
import NotFound from "@/ui/pages/common/NotFound";
import AuthProtectedRoute from "@/app/routes/auth-protected-route";
import MainLayout from "@/ui/layout/MainLayout";
import { lazy } from "react";
import Sidebar from "@/ui/pages/sidebar/Sidebar";
import PostsPage from "@/ui/pages/posts/PostsPage";
import AddProduct from "@/ui/pages/products/AddProduct";
// import LoginPage from "@/ui/pages/auth/LoginPage";
// import PostsPage from "@/ui/pages/posts/PostsPage";
// import PostDetailsPage from "@/ui/pages/posts/details/PostDetailsPage";

const LoginPage = lazy(() => import("@/ui/pages/auth/LoginPage"));
const ProductsPage = lazy(() => import("@/ui/pages/products/ProductsPage"));
const CategoryPage = lazy(() => import("@/ui/pages/category/CategoryPage"));

// const LoginPage = lazyLoad("@/ui/pages/auth/LoginPage");
// const PostsPage = lazyLoad("@/ui/pages/posts/PostsPage");
// const PostDetailsPage = lazyLoad("@/ui/pages/posts/details/PostDetailsPage");

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
                  element: <PostsPage/>
                }
                // {
                //   path: ":productId",
                //   element: <PostDetailsPage />
                // }
              ]
            },
            {
              path: "/products/*",
              children: [
                {
                  index: true,
                  element: <ProductsPage />
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
