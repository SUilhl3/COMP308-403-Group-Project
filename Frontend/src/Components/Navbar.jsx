import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Hooks/useUser";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout"
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
          <Button onClick={handleLogout} variant = "outlined" startIcon={<LogoutIcon />}>Logout</Button>
        </>
      )}
    </nav>
  );
}

export default Navbar;