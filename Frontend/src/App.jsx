

// import React from 'react'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'

// import home from './Screen/Home'
// import Signup from './Pages/Signup'
// import Login from './Pages/Login'
// import LoginAdmin from './Screen/LoginAdmin'

// import ProtectedRoutes from './components/ProtectedRoutes'
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
// import Completeorder from './Pages/Completeorder'
// import Home from './Screen/Home'



// function App() {
//   return (
//     <BrowserRouter>

//       <Routes>

//         {/* PUBLIC ROUTES */}
//         <Route path='/' element={<Main />} />
//         <Route path='/shop' element={<Shop />} />
//         <Route path='/about' element={<About />} />
//         <Route path='/contact' element={<Contact />} />
//         <Route path='/payment' element={<Payment />} />
//         <Route path='/cart' element={<Cart />} />
//         <Route path='/signup' element={<Signup />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/Completeorder' element={<Completeorder />} />

//         {/* ADMIN PROTECTED ROUTES */}

//         <Routes ></Routes>

//         <Route element={<Layout />}>


//           <Route path='/home' element={<Home />}/>
//           <Route path='/book' element={<Book />} />
//           <Route path='/students' element={<Students />} />
//           <Route path='/assign' element={<Assign />} />
//           <Route path='/returned' element={<Returned />} />
//           <Route path='/cateigories' element={<Cateigories />} />

//         </Route>

//         {/* </Route> */}

//       </Routes>

//     </BrowserRouter>
//   )
// }

// export default App


// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";

// // Pages
// import Main from "./Pages/Main";
// import Shop from "./Pages/Shop";
// import About from "./Pages/About";
// import Contact from "./Pages/Contact";
// import Payment from "./Pages/Payment";
// import Cart from "./Pages/Cart";
// import Signup from "./Pages/Signup";
// import Login from "./Pages/Login";
// import Completeorder from "./Pages/Completeorder";

// // Admin Screens
// import Home from "./Screen/Home";
// import Book from "./Screen/Book";
// import Students from "./Screen/Students";
// import Assign from "./Screen/Assign";
// import Returned from "./Screen/Returned";
// import Categories from "./Screen/Categories";

// // Layout + Protection
// import Layout from "./components/Layout";
// import ProtectedRoutes from "./components/ProtectedRoutes";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* PUBLIC ROUTES */}
//         <Route path="/" element={<Main />} />
//         <Route path="/shop" element={<Shop />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/payment" element={<Payment />} />
//         <Route path="/cart" element={<Cart />} />

//         <Route path="/completeorder" element={<Completeorder />} />


//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />

//         {/* ADMIN PROTECTED ROUTES */}
//         <Route element={<ProtectedRoutes />}>
//           <Route element={<Layout />}>
//             <Route path="/home" element={<Home />} />
//             <Route path="/book" element={<Book />} />
//             <Route path="/students" element={<Students />} />
//             <Route path="/assign" element={<Assign />} />
//             <Route path="/returned" element={<Returned />} />
//             <Route path="/categories" element={<Categories />} />
//           </Route>
//         </Route>

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;



import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import Main from "./Pages/Main";
import Shop from "./Pages/Shop";
import About from "./Pages/About";
import Contact from "./Pages/Contact"
import Payment from "./Pages/Payment";
import Cart from "./Pages/Cart";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Completeorder from "./Pages/Completeorder";
import OrderComplete from "./Pages/OrderComplete";

// Admin Screens
import AdminLogin from "../../Frontend/src/Admin/Pages/AdminLogin"
import Desboard from "./Admin/Desboard";
import Book from "./Admin/Book";
import User from "./Admin/User";
import Assign from "./Admin/Assign";
import AllProduct from "./Admin/AllProduct"
import Returned from "./Admin/Returned";
import Categories from "./Admin/Categories";
import Order from "./Admin/Order";
import Contacts from "./Admin/Contacts";

// Layout + Protection
import Layout from "./components/Layout";
import ProtectedRoutes from "./components/ProtectedRoutes";

// import signupadmin from "../src/Admin/SignupAdmin"
// import loginadmin from "../src/Admin/LoginAdmin"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Main />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="order" element={<OrderComplete />} />
        <Route path="/completeorder" element={<Completeorder />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />



        {/* <Route element={<ProtectedRoutes />}> */}
        {/* ADMIN PROTECTED ROUTES */}
        <Route path="/authlogin" element={<AdminLogin />} />

        <Route path="/admin" element={<Layout />}>
          <Route path="desboard" element={<Desboard />} />
          <Route path="book" element={<Book />} />
          <Route path="user" element={<User />} />
          <Route path="assign" element={<Assign />} />
          <Route path="allproduct" element={<AllProduct />} />
          <Route path="order" element={<Order />} />
          <Route path="returned" element={<Returned />} />
          <Route path="categories" element={<Categories />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;