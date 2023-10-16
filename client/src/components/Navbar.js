// import { BrowserRouter, Routes, Route} from "react-router-dom";
// // import Layout from "../pages/Layout";
// import Home from "../pages/Home";
// import Blogs from "../pages/Blogs";
// import Contact from "../pages/Contact";
// import NoPage from "../pages/NoPage";
// import LandingPage from "../pages/LandingPage";
// import RegisterPage from "../pages/RegisterPage";
// import ForgetPasswordPage from "../pages/ForgetPasswordPage";
// const ProtectedRoute = ({ children, auth=false }) => {
//   const isLoggedIn = localStorage.getItem('user:token') !== null || false;

//   if(!isLoggedIn && auth) {
//     return <Navigate to={'/users/sign_in'} />
//   }else if(isLoggedIn && ['/users/sign_in', '/users/sign_up'].includes(window.location.pathname)){
//     console.log('object :>> ');
//     return <Navigate to={'/'} />
//   }

//   return children
// }
const NavbarHome = ({showAlert}) => {
 
  return (
<></>
  );
};

export default NavbarHome;
