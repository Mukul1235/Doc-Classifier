import axios from 'axios'
import React, { useEffect, useImperativeHandle, useState } from 'react'
import UserForm from './UserForm';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();
    const handleUser = async () => {
        const response = await axios.get('/admin/');
        // console.log(response.data.profiles);
        
        setProfile([...response.data.profiles]);
    }
  
  const handleClick = () => {
    // navigate(`/allimage/${}`)
  }
    useEffect(() => {
        handleUser();

    }, [])
  

  return (
    <div>
          <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {profile.map(({name,id,email}) => (
          <tr key={id}>
            <td>
              {name}
            </td>
            <td>{email}</td>
            <td>
              <Item id={id} />
             </td>
          </tr>
        ))}
      </tbody>
            </table>
    </div>
  )
}

const Item =  ({ id }) => {
    const navigate = useNavigate();

  const handleClick = () => {
  navigate(`/allimage?id=${id}`)
}
  return (
         <button onClick={handleClick}>Go to Item</button>

  )
}

export default Dashboard
