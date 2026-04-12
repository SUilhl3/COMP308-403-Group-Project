import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Hooks/useUser";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = async (e) => {
    e.preventDefault();

    await logout(); 
  };

  return (
    <nav>
      {!user ? (
        <>
          <Link to="/register">Register</Link> |{" "}
          <Link to="/login">Login</Link>
        </>
      ) : (
        <>
          <Link to="/dashboard">Dashboard</Link> |{" "}
          <Link to="/update">Update Account</Link> |{" "}
          <Link to="/addGame">Add Game</Link> |{" "}
          <Link to="/games">View Games</Link> |{" "}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;