import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const AuthProtectedRoute = () => {
  const isAuth = true;
  const userData = true;
  const userError = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (userError) {
      navigate("/login");
    }
  }, [userError]);

  return isAuth ? (
    userData ? (
      <Outlet />
    ) : (
      <h1>Loading...</h1>
    )
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AuthProtectedRoute;
