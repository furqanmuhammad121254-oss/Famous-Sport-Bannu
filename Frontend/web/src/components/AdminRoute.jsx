// src/routes/AdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" />;

  return user.role === "admin"
    ? <Outlet />
    : <Navigate to="/" />;
};

export default AdminRoute;