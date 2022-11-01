import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import './index.css';
import App from './App';
import {Login, Register} from './components/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    
   
    <>
    
    
    <BrowserRouter>
    
    <Routes>
  
    <Route path="/login" element={<Login />}/>
    <Route path="/register" element={<Register />}/>
   

    </Route> 

    </Routes> 
  

    </BrowserRouter>
   
   
    
    </>
  
);
