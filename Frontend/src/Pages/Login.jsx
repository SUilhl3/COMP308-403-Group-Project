import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";

const LOGIN = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
      username
      email
    }
  }
`;

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const [loginUser, { loading, error }] = useMutation(LOGIN);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({
        variables: {
          username: formData.username,
          password: formData.password
        }
      });

      localStorage.setItem("user", JSON.stringify(data.loginUser));

      setMessage("Login successful");

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
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