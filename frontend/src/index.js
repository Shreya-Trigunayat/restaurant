import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom';
import Home from './page/Home';
import About from './page/About';
import Contact from './page/Contact';
import Menu from './page/Menu';
import Newproduct from './page/Newproduct';
import Login from './page/login';
import Signup from './page/Signup';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
        <Route index element={<Home/>}/>
        <Route path='menu' element={<Menu/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='contact' element={<Contact/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='newproduct' element={<Newproduct/>}/>
        <Route path='signup' element={<Signup/>}/>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <RouterProvider router={router}/>

  
);


reportWebVitals();
