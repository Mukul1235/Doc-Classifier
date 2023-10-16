import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios';
import './myapp.css'


export default function RegisterPage({showAlert}) {
    const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
let navigate=useNavigate();
const handleSignup = async(e) => {
    // Add signup logic here (e.g., API request)
      // console.log('Signup clicked with name:', name, 'email:', email, 'and password:', password);
      e.preventDefault();
      
      try { 
        const userData = {
            name: name,
            email: email,
            password: password
             };
          const res = await axios.post('/user/create/', userData)
          console.log(res.data.user)
          if(res.data.success)
          {localStorage.setItem('user',JSON.stringify(res.data.user))
          navigate("/home")
          console.log(res.data.user);
            showAlert("Succesfully Loged in","success")}
            else{
                showAlert("Invalid Credentials","danger")
            }
      }
      catch (err) {
          
      }
  }
    return (
        
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <div>
                <p>
                    <label>Username</label><br/>
                    <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
                </p>
                <p>
                <button onClick={handleSignup}>Signup</button>
                </p>
            </div>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}