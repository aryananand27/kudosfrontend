import React, { useEffect } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import SignIn from './components/SignIn'
import Register from './components/Register'
import Update from './components/Update'

import {Box} from '@mui/material'





const App = () =>(
 
  
    <BrowserRouter>  
       <Box sx={{background:"#000"}}>  
            <Navbar/>    
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/signin' element={<SignIn/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/updates' element={<Update/>}/>
            </Routes>
       </Box>
       
    </BrowserRouter>
  );


export default App
