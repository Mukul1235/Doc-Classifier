import React, {  useRef, useState } from 'react';
import './drop-file-input.css';
import { ImageConfig } from '../../config/ImageConfig'; 
import uploadImg from '../../assets/cloud-upload-regular-240.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DropFileInput = ({showAlert}) => {
    let navigate=useNavigate()
    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        if(!localStorage.getItem('token')) {
            navigate("/");
            showAlert("Please Login First","danger")}
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [newFile];
            setFileList(updatedList);
            // props.onFileChange(updatedList);
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        // props.onFileChange(updatedList);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log("button clicked!")
        const formData = new FormData();
        formData.append('image', fileList[0]);
        console.log(fileList[0]);
        // console.log(formData);
    
        try {
          const response = await axios.post('http://127.0.0.1:5000/upload-image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
            const title=response.data.response
          console.log(response.data);
          var isVerified = false;
          if (response.data.response !== 'None') {
              isVerified = true;
          }
          console.log(isVerified)
          formData.append('isVerified', isVerified);
          formData.append('title', title);
          const user=JSON.parse(localStorage.getItem('user'))
          console.log(user.id)
          formData.append('userId',user.id)
          // formData.append('userId',"6526e7e10b274044f1edd8c4")
          const res = await axios.post('/demo/', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          })
          console.log(res.data);
      }
      catch (error) {
          console.log(error);
      }
      }
    return (
        <>
        
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p className="edit3">Drag & Drop your files here</p>
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Ready to upload
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                    <div className="drop-file-preview__item__info">
                                        <p>{item.name}</p>
                                        <p>{item.size}B</p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
            <div>
            <form onSubmit={handleSubmit}>
           <button type="submit">Upload</button>        </form>
            </div>
        </>
    );
}

export default DropFileInput;
