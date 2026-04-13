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
    <div class = "flex items-center justify-center min-h-screen bg-linear-to-t from [#08ffda] to [#10b1ae]">
      <div class= "w-full max-w-lg bg-gradient-to-r from-blue-200 to-cyan-200 p-20 rounded-lg shadow-lg">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <div class = "p-5">
        <TextField
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
        />
        </div>
        <div class = "p-5">
        <TextField
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />
        </div>
        <div class = "p-5">
        <TextField
          type= "password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />
        </div>
        <br></br>
        <Button variant = "contained" type="submit" startIcon={<SendIcon />} disabled={loadingRegister}>
          {loadingRegister ? "Registering..." : "Register"}
        </Button>
      </form>
      <br></br>
      {message && <p>{message}</p>}
      {errorRegister && <p>{errorRegister.message}</p>}

      <p>
        Already have an account? <Link to="/login" class="font-medium text-fg-brand hover:underline">Login</Link>
      </p>
    </div>
    </div>
  );
}

export default Register;