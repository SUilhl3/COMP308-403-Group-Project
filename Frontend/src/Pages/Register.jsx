import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../Hooks/useUser";

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
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={loadingRegister}>
          {loadingRegister ? "Registering..." : "Register"}
        </button>
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