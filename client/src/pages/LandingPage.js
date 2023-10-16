import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { Link } from 'react-router-dom'

import './myapp.css'
// import BackgroundImage from '../../assets/images/bg.png'

export default function LandingPage({showAlert}) {
    const [credentials,setCredentials]=useState({email:"",password:''});
    let navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const u={
          email:credentials.email,
          password:credentials.password
        }
        const response = await axios.post("/user/sign-In",u);
          const json=response.data;
          console.log(json)
          if(json.success){
            localStorage.setItem('token',json.authToken);
            localStorage.setItem('user',JSON.stringify(json.user));
            navigate("/home");
            showAlert("Succesfully Loged in","success")
          }
          else{
            showAlert("Invalid Credentials","danger")
          }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <>
        <header style={ HeaderStyle }>
            <h1 >Document Verification</h1>
            {/* <p className="main-para text-center">Check and verify your documents</p> */}
    <div className='mt-2'>
      <h2>Login To Continue</h2>
      <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input htmlFor="email" className="form-control" name="email" id="email" value={credentials.email} placeholder="Enter email" onChange={onChange} required/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" placeholder="Password" onChange={onChange} value={credentials.password} name="password" minLength={5}/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
    
        </header>
        </>
    )
    
}

const HeaderStyle = {
    width: "100%",
    height: "150%",
    // background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
    
    
}