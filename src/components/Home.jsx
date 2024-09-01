import React, { useEffect, useState } from 'react'
import { Box,CardContent,CardMedia,Stack,Typography ,Button} from '@mui/material';

const Home = () => {
    let auth=JSON.parse(sessionStorage.getItem("user"));
    let [jobs,setJobs]=useState([]);

    const getdata=async()=>{
        let interest;
        if(auth &&auth.result){
            interest=auth.result.interest;
        }
       interest=interest.replaceAll(" ","");
       
        let result=await fetch(`https://jsearch.p.rapidapi.com/estimated-salary?job_title=${interest}&location=India&radius=100`,{
            method:"GET",
            headers: {
              'x-rapidapi-key': '1106b3e7e7mshc44f11f684fc398p1fdbc2jsn54ed65b7a40f',
              'x-rapidapi-host': 'jsearch.p.rapidapi.com'
            }
        })
        result=await result.json();
        
        if(result){
            setJobs(result.data);
        }

    }
  useEffect(()=>{
    if(auth && auth.result){
      getdata();
    }
      
  },[2])
  console.log(jobs);
  return (
       <>
      {auth?<>
        <h1 className='main-heading'> Your Prefered Jobs.</h1>
        <div className='fav-main-container'>
    
    
    <Stack direction='row' flexWrap="wrap" justifyContent="space-evenly" alignItems="center" gap={0.5}>
  {
    
    jobs.map((items,idx)=>(
        <Box key={idx}
    
  sx={{
    boxShadow: 'none',
    borderRadius: '20px',
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: { xs: "100%", md: "300px" },
    height: "326px",
    margin: '35px',
   
  }}
>
 
  <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff',width:{xs:"240px",sm:"348px",md:"300px"} }}>
      <CardMedia
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT18b7znox2gkZ0yaxLU0WOMLaJQgn1gPo_LQ&s"
        alt={items.job_title}
        sx={{ borderRadius: '50%', height: '180px', width: '180px', mb: 2, border: '1px solid #e3e3e3' }}
      />
      <Typography variant="h6">
        {items.job_title}{' '}
      </Typography>
      <Typography variant="h6" style={{fontSize:"14px"}}>
       {"INR"} {items.max_salary}
      </Typography>
      <Typography variant="h6"  style={{fontSize:"16px",color:"gray"}}>
        {items.publisher_name}{' '}
      </Typography>
     
      </CardContent>
      </Box>
      )
  )}
  </Stack>
  </div>
      </>:<div style={{width:"97vw",height:"98vh",display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontFamily:'"Baloo Bhai 2", sans-serif',fontSize:"25px",fontWeight:"700"}}>Please Login/Register for Jobs Search.</div>}
       </>
  )
}

export default Home
