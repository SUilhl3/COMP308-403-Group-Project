import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/register">Register</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      {token && <Link to="/dashboard">Dashboard</Link>} |{" "}
      {token && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default Navbar;