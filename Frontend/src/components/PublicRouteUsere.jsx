// src/routes/PublicRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Outlet />;

  // already logged in → redirect
  return user.role === "admin"
    ? <Navigate to="/home" />
    : <Navigate to="/" />;
};

export default PublicRoute;