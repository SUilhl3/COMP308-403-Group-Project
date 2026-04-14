import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../Hooks/useUser";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LoginIcon from "@mui/icons-material/Login"
import { useQuery } from "@apollo/client";
import { GET_MY_GAMES } from "../graphql/queries";

function Login() {
  const navigate = useNavigate();
  const {login, loading, error, message, setMessage, user} = useUser();

  const {refetch} = useQuery(GET_MY_GAMES, {skip: !user})

  const [formData, setFormData] = useState({
    username: "",
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

    await login(formData.username, formData.password, navigate)
    if (!error)
    {
      refetch();
      setMessage("");
    }
  };

  return (
    <div class = "flex items-center justify-center min-h-screen bg-linear-to-t from [#08ffda] to [#10b1ae]">
      <div class= "w-full max-w-lg bg-gradient-to-r from-blue-200 to-cyan-200 p-20 rounded-lg shadow-lg">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div class = "p-5">
            <label><b>Username:</b></label><br/>
            <TextField
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
          />
          </div>
          <div class = "p-5">
            <label><b>Password:</b></label><br/>
            <TextField
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
          </div>
          
          <div class= "p-5">
            <Button variant = "contained" startIcon = {<LoginIcon />} type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
      </form>

        {message && <p>{message}</p>}
        {error && <p>{error.message}</p>}

        <p>
          Don’t have an account? <Link to="/register" class="font-medium text-fg-brand hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;