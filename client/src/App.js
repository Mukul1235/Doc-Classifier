// import React, { Component } from 'react';
// import axios from 'axios';

// class ImageUpload extends Component {
//   state = {
//     selectedFile: null,
//   };

//   handleFileChange = (event) => {
//     this.setState({
//       selectedFile: event.target.files[0],
//     });
//   };

//   handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('image', this.state.selectedFile);
//     console.log(this.state.selectedFile);

//     try {
//       const response = await axios.post('http://127.0.0.1:5000/upload-image', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   render() {
//     return (
//       <div>
//         <h2>Upload an Image</h2>
//         <form onSubmit={this.handleSubmit}>
//           <input type="file" onChange={this.handleFileChange} />
//           <button type="submit">Upload</button>
//         </form>
//       </div>
//     );
//   }
// }

// export default ImageUpload;

import "./App.css";
import NavbarHome from "./components/Navbar";
// import Demo from "./components/Demo"
import Alert from "./components/Alert"
import { useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom"; 
import LandingPage from "./pages/LandingPage";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import Profile from "./pages/profile";
import Dashboard from "./components/admin/Dashboard";
import UserForm from "./components/admin/UserForm";
// import ForgetPasswordPage from "./pages/ForgetPasswordPage";
function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  return (
    <>

      <Alert alert={alert}></Alert>
      <NavbarHome />

      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route path="/" element={<LandingPage showAlert={showAlert}/>} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          {/* <Route path="*" element={<NoPage />} /> */}
          {/* <Route path="/auth/signup" element={<Signup showAlert={showAlert}/>} /> */}
          <Route path="/home" element={<Home showAlert={showAlert}/>} />
          <Route path="/register" element={<RegisterPage showAlert={showAlert}/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/allimage" element={<UserForm />} />
          
          {/* <Route path="/forget" element={<ForgetPasswordPage />} /> */}
        {/* </Route> */}
      </Routes>

          {/* <Demo /> */}
       {/* <div class="filter"></div> */}
  

    </>
  );
    }




export default App;
