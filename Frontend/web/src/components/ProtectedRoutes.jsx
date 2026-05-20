// import React, { useEffect, useState } from 'react';
// import { Navigate, Outlet } from 'react-router-dom'
// import api from '../services/api';

// function ProtectedRoutes() {
//     const [user, setUser] = useState(null)
//     const [isLoggedIn, setIsLoggedIn] = useState(null)

//     async function getMe() {
//         try {
//             const res = await api.get('/auth/me');
//             if (res.status === 200) {
//                 setUser(res.data.user)
//                 setIsLoggedIn(true)
//             }
//         } catch (error) {
//             setIsLoggedIn(false)
//         }
//     }
//     useEffect(() => {
//         getMe()
//     }, [])

//     if (isLoggedIn == null) return <h1>Checking Auth</h1>


//     return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
// }

// export default ProtectedRoutes


// import { Navigate } from "react-router-dom";

// const AdminRoute = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   return user?.role === "admin"
//     ? children
//     : <Navigate to="/" />;
// };

// export default AdminRoute;



import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, allowedRoles, children }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
