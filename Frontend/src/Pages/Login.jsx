import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../Hooks/useUser";


function Login() {
  const navigate = useNavigate();
  const {login, loading, error, message, setMessage} = useUser();
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
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {message && <p>{message}</p>}
      {error && <p>{error.message}</p>}

      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;