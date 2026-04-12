import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../Hooks/useUser";

import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send"


function Register() {
  const navigate = useNavigate();
  const {register, loadingRegister, errorRegister, message, setMessage} = useUser();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(formData.username, formData.email, formData.password, navigate)
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

        <TextField
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
        />

        <TextField
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          type= "password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button variant = "contained" type="submit" startIcon={<SendIcon />} disabled={loadingRegister}>
          {loadingRegister ? "Registering..." : "Register"}
        </Button>
      </form>

      {message && <p>{message}</p>}
      {errorRegister && <p>{errorRegister.message}</p>}

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;