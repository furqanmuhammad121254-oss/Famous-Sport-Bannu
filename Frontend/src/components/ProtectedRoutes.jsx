// import React, { useEffect, useState } from 'react';
// import { Navigate, Outlet } from 'react-router-dom'
// import api from '../services/api';

// function ProtectedRoutes() {
//   const [user, setUser] = useState(null)
//   const [isLoggedIn, setIsLoggedIn] = useState(null)

//   const isAdmin = (req, res, next) => {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ msg: "Access denied: Admin only" });
//     }

//     next();
//   };

//   export default isAdmin;

//   async function getMe() {
//     try {
//       const res = await api.get('/auth/me');
//       if (res.status === 200) {
//         setUser(res.data.user)
//         setIsLoggedIn(true)
//       }
//     } catch (error) {
//       setIsLoggedIn(false)
//     }
//   }
//   useEffect(() => {
//     getMe()
//   }, [])

//   if (isLoggedIn == null) return <h1>Checking Auth</h1>


//   return isLoggedIn ? <Outlet /> : <Navigate to='/home' />
// }

// export default ProtectedRoutes


import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../services/api";

function ProtectedRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  async function getMe() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      const res = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
      setIsLoggedIn(true);

    } catch (error) {
      setIsLoggedIn(false);
    }
  }

  useEffect(() => {
    getMe();
  }, []);

  if (user && user.role !== "admin") {
    return <Navigate to="/login" />;
  }

}

export default ProtectedRoutes;