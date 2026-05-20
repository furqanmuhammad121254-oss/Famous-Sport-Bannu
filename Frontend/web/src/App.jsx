
// import React from 'react'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'

// import Home from './Screen/Home'
// import Signup from './Pages/Signup'
// import Login from './Pages/Login'
// import LoginAdmin from './Screen/LoginAdmin'

// import ProtectedRoutes from './components/ProtectedRoutes'
// // import AdminRoutes from './components/AdminRoutes'
// // import UserRoutes from './components/UserRoutes'

// import Layout from './components/Layout'

// import Book from "./Screen/Book"
// import Students from './Screen/Students'
// import Assign from './Screen/Assign'
// import Returned from "./Screen/Returned"
// import Cateigories from './Screen/Categories'

// import Main from './Pages/Main'
// import About from './Pages/About'
// import Contact from './Pages/Contact'
// import Shop from "./Pages/Shop"
// import Payment from "./Pages/Payment"
// import Cart from './Pages/Cart'
// import ForgotPassword from './Pages/Forgot Password'
// import OTPVerification from './Pages/OTPVerification'

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* 🔓 PUBLIC ROUTES */}
//         <Route path='/' element={<Main />} />
//         <Route path='/shop' element={<Shop />} />
//         <Route path='/about' element={<About />} />
//         <Route path='/contact' element={<Contact />} />
//         <Route path='/payment' element={<Payment />} />
//         <Route path='/cart' element={<Cart />} />
//         <Route path='/signup' element={<Signup />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/adminlogin' element={<LoginAdmin />} />
//         <Route path='/forget' element={<ForgotPassword />} />
//         <Route path='/otp' element={<OTPVerification />} />

//         👤 USER PROTECTED ROUTES
//         {/* <Route element={<UserRoutes />}>
//           {/* add user-only pages here later */}
//         {/* </Route> */}

//         {/* 🔐 ADMIN PROTECTED ROUTES */}
//         <Routes element={<ProtectedRoutes />}>
//           <Route element={<Layout />}>
//             <Route path='/home' element={<Home />} />
//             <Route path='/book' element={<Book />} />
//             <Route path='/students' element={<Students />} />
//             <Route path='/assign' element={<Assign />} />
//             <Route path='/returned' element={<Returned />} />
//             <Route path='/cateigories' element={<Cateigories />} />
//           </Route>
//         </Routes>

//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App


import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import home from './Screen/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import LoginAdmin from './Screen/LoginAdmin'

import ProtectedRoutes from './components/ProtectedRoutes'
import Layout from './components/Layout'

import Book from "./Screen/Book"
import Students from './Screen/Students'
import Assign from './Screen/Assign'
import Returned from "./Screen/Returned"
import Cateigories from './Screen/Categories'

import Main from './Pages/Main'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Shop from "./Pages/Shop"
import Payment from "./Pages/Payment"
import Cart from './Pages/Cart'
import ForgotPassword from './Pages/Forgot Password'
import Completeorder from './Pages/Completeorder'
import Home from './Screen/Home'

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path='/' element={<Main />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/adminlogin' element={<LoginAdmin />} />
        <Route path='/forget' element={<ForgotPassword />} />
        <Route path='/Completeorder' element={<Completeorder />} />

        {/* ADMIN PROTECTED ROUTES */}
        {/* <Route element={<ProtectedRoutes />}> */}

        <Route element={<Layout />}>

          <Route path='/home' element={<Home />} />
          <Route path='/book' element={<Book />} />
          <Route path='/students' element={<Students />} />
          <Route path='/assign' element={<Assign />} />
          <Route path='/returned' element={<Returned />} />
          <Route path='/cateigories' element={<Cateigories />} />

        </Route>

      {/* </Route> */}

      </Routes>

    </BrowserRouter>
  )
}

export default App