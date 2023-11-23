import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Sidebar from "./sidebar/Sidebar";

const MainLayout = () => {
  return (
    <div className="w-full min-h-screen grid grid-cols-[320px,1fr]">
      <Sidebar />
      <Suspense
        fallback={
          <div className="min-h-screen">
            <h1>Loading...</h1>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MainLayout;
