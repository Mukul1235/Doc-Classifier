import React, { useState } from 'react';
import DropFileInput from '../components/drop-file-input/DropFileInput';

const Home = ({showAlert}) => {
  const [selectedFileType, setSelectedFileType] = useState('');
 // State to store the selected file type
    

  const handleFileTypeChange = (event) => {
    setSelectedFileType(event.target.value[0]);
  };



  return (
    <div className="body">
      <div className="box">
        <h2 className="header">Drag And Drop Files Here</h2>
        <h4>Choose the type of file to be uploaded:</h4>

        <select value={selectedFileType} onChange={handleFileTypeChange}>
          <option name="Aadhar Card">Aadhar Card</option>
          <option name="Passport ID">Passport ID</option>
          <option name="Driving License">Driving License</option>
          <option name="Voter ID">Voter ID</option>
        </select>
        
        <DropFileInput showAlert={showAlert}/>
        
      </div>
    </div>
  );
};

export default Home;