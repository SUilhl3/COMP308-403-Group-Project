import './App.css'

import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Register from './Pages/Register';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

import Navbar from './components/Navbar';
import ProtectedRoutes from './Components/ProtectedRoutes';

function App() {

  return (
    <>
      {/* Navbar shows on all pages */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element = {<ProtectedRoutes />}>
          <Route path = "/dashboard" element = {<Dashboard />} /> 
        </Route>
      </Routes>
    </>
  )
}

export default App