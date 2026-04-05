import './App.css'

import {BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";

import Home from "./Pages/Home";
import Register from './Pages/Register';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import PrivateRoutes from './Components/ProtectedRoutes';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route index element = {<Home />} />
        <Route path = "home" element = {<Home />} />
        <Route path = "login" element = {<Login />} />
        <Route path = "register" element = {<Register />} />
        <Route element = {<PrivateRoutes />}>
          <Route path = "dashboard" element = {<Dashboard />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
