import './App.css'

import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Register from './Pages/Register';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

import Navbar from './Components/Navbar';
import ProtectedRoutes from './Components/ProtectedRoutes';
import { UserProvider } from './Context/UserContext';
import UpdateAccount from './Pages/UpdateAccount'
import AddGame from './Pages/AddGame';
import ViewGames from './Pages/ViewGames';
import ViewSingleGame from './Pages/ViewSingleGame';

function App() {

  return (
    <>
    <UserProvider>
        {/* Navbar shows on all pages */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element = {<ProtectedRoutes />}>
            <Route path = "/dashboard" element = {<Dashboard />} /> 
            <Route path = "/update" element = {<UpdateAccount />} />
            <Route path = "/addGame" element = {<AddGame />} />
            <Route path = "/games" element = {<ViewGames />} />
            <Route path="/game/:id" element={<ViewSingleGame />} />
          </Route>
        </Routes> 
      </UserProvider>
    </>
  )
}

export default App