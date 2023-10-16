import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const UserForm = () => {
  // console.log(id);
  const [searchParams] = useSearchParams();
  const [poster, setposter] = useState();
  const id = searchParams.get('id');
  console.log(id)
  const handleUser = async () => {
    try {
          console.log(id)
        const response = await axios.get('/admin/allimage?userId='+id);
    // console.log(response.data.images);
    setposter(...response.data?.images)
    } catch (error) {
      console.log(error)
    }

  
    }
    useEffect(() => {
        handleUser();
    }, [id])
  console.log(poster?.image)
  if (!poster || !poster?.image) {
    return ;
}
  return (
       <div>

      <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {poster?.image.map(({image,title,isVerified}) => (
          <tr >
            <td>
              <img src={image.url} width="100" height="100" />
            </td>
            <td>{title}</td>
            <td>{isVerified?'Verified':'Not Verified'}</td>
          </tr>
        ))}
      </tbody>
            </table>
                  </div>
  )
}

export default UserForm
