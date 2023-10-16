import axios from 'axios';
import React, { useEffect, useState } from 'react'


const Profile = () => {
    const [poster, setposter] = useState();
    const [array, setarray] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
//    console.log(user)
    const searchMovies = async () => {
        try {
           const a=user?.id
        
        const response = await axios.get('/user/getImage?userId='+a);
            const data = response.data.data;
            setposter(...data);
            setarray([...poster.image])
        } catch (error) {
            console.log(error)
        }
  
  
        // setposter([...response.data]);
    };

    // const a = poster.image;
    console.log(array)
    // console.log(object)

//  <div class="row">
//           {array.map(({image,title,isVerified}) => (
//                       <div class="col-md-6">
//                           <div>
//                           <Card url={image.url} title={title} isVerified={isVerified} />
//                           </div>
//                       </div>
//      ))}
  //     </div>
  

    useEffect(() => {

 searchMovies();
  },poster);

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
        {array.map(({image,title,isVerified}) => (
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
 
            // <div class="card" >
            //     <img class="card-img-top" src={url} alt="Card image cap" className=' h-[50%] w-[50%]' />
            //     <div class="card-body">
            //         <h5 class="card-title">{title}</h5>
            //     <p class="card-text">{isVerified ?'Verified':'Not Verified' }</p>
            //         <a href="#" class="btn btn-primary">Go somewhere</a>
            //     </div>
//             // </div>
// const Card = ({ url ,title,isVerified}) => {
//     // console.log(url)
//     console.log(isVerified)
//     return (
       

       
//     )

// }


export default Profile
