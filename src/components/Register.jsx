import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate=useNavigate();
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[interest,setInterest]=useState("");
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [load,setLoad]=useState(false);

const register=async()=>{
    let resume;
    if(fileUrl){
        resume=fileUrl;
    }
  let result=await fetch('https://kudosbackend.vercel.app/register',{
    method:"Post",
    body:JSON.stringify({name,email,password,interest,resume}),
    headers:{
      'Content-Type':"application/json"
    }
  })
  
  result=await result.json();
  
  if(result.result){
    
    sessionStorage.setItem("user",JSON.stringify(result));
    navigate('/');
  }
  else if(result.err){
    alert(`${result.err}`);
    setName("");
    setEmail("");
    setPassword("");
    setInterest("");
  }
  else{
    alert(`${result.error}`);
    navigate('/register');
  }
}
const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
 
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
  setLoad(true);
    
    try {
      const response = await axios.post('https://kudosbackend.vercel.app/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setFileUrl(response.data.fileUrl);
      alert("file uploaded successfully..")
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="main-container">
    <div className='form'>
        <br/>
        <h2 className='main-heading'>Register Now</h2>
        <br/>
        <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Enter your Name'/>
        <br />
        <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}  placeholder='Enter your Email'/>
        <br />
        <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter your Password'/>
        <br />
        <input type='text' value={interest} onChange={(e)=>{setInterest(e.target.value)}} placeholder='Enter your Area Of Interest'/>
        <br />
        <input type="file" onChange={handleFileChange} />
             <div style={{display:"flex",flexDirection:"row"}}>
             <button className='uplbtn'  onClick={handleUpload}>Upload Resume</button>
             {fileUrl ? (
          <img src={fileUrl} alt="Uploaded file" style={{width:"32px",height:"32px"}} />
      ):<>{load&&<h4 style={{color:"white",marginTop:"-1px"}}>Loading....</h4>}</>}
            </div>
            <br/>
        <button className='regbtn'  onClick={register}>Create Account</button>
        <p>Already have an account?? <Link to='/signin'>LOG IN</Link></p>
    </div>
</div>
  )
}

export default Register

