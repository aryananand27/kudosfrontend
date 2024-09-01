import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const Update = () => {
    let auth=   JSON.parse( sessionStorage.getItem("user"));
   let[data,setData]=useState([]);
 
let navigate=useNavigate();
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [load,setLoad]=useState(false);
    const getData=async()=>{
        let userId;
        if(auth && auth.result){
            userId=auth.result._id;
        }
        let result=await fetch(`https://kudosbackend.vercel.app/getresume/${userId}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        result=await result.json();
        if(result.err){
            alert("something went Wrong");
        }
        else{
            setData(result);
        }
    }
    useEffect(()=>{
        getData();
    },[])
  const update=async()=>{
    let userID;
    if(auth && auth.result){
        userID=auth.result._id;
    }
    let resume;
    if(fileUrl){
        resume=fileUrl;
    }
    console.log(resume);
    let result=await fetch(`https://kudosbackend.vercel.app/update/${userID}`,{
        method:"PUT",
        body:JSON.stringify({resume}),
        headers:{
            "Content-Type":"application/json"
        }
    })
    result=await result.json();

    if(result.acknowledged){
        navigate('/');
    }
   
  }
    
  
    
  return (
    <div className="main-container">
    <div className='form'>
        <br/>
        <h2 className='main-heading'>Update Resume</h2>
        <br/>
       
        <input type="file" onChange={handleFileChange} />
             <div style={{display:"flex",flexDirection:"row"}}>
             <button className='uplbtn'  onClick={handleUpload}>Upload Resume</button>
             {fileUrl ? (
          <img src={fileUrl} alt="Uploaded file" style={{width:"32px",height:"32px"}} />
      ):<>{load&&<h4 style={{color:"white",marginTop:"-1px"}}>Loading....</h4>}</>}
            </div>
            <br/>
        <button className='regbtn' onClick={update}>Update Resume</button>
    <br/>
    <br/>
    </div>
</div>
  )
}

export default Update
