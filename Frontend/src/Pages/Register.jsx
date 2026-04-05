import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";

const REGISTER = gql`
  mutation RegisterUser($username: String!, $password: String!, $email: String!) {
    registerUser(username: $username, password: $password, email: $email) {
      id
      username
      email
    }
  }
`;

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const [registerUser, { loading, error }] = useMutation(REGISTER);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser({
        variables: {
          username: formData.username,
          email: formData.email,
          password: formData.password
        }
      });

      setMessage("Account created successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error(err);
    }
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

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {message && <p>{message}</p>}
      {error && <p>{error.message}</p>}

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;