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
          <Link to="/home" class="font-medium text-fg-brand hover:underline">Home</Link> | {" "}
          <Link to="/register" class="font-medium text-fg-brand hover:underline">Register</Link> | {" "}
          <Link to="/login" class="font-medium text-fg-brand hover:underline">Login</Link>
        </>
      ) : (
        <>
          <Link to="/dashboard" class="font-medium text-fg-brand hover:underline">Dashboard</Link> |{" "}
          <Link to="/update" class="font-medium text-fg-brand hover:underline">Update Account</Link> |{" "}
          <Link to="/addGame" class="font-medium text-fg-brand hover:underline">Add Game</Link> |{" "}
          <Link to="/games" class="font-medium text-fg-brand hover:underline">View Games</Link> |{" "}
          <Button onClick={handleLogout} variant = "outlined" startIcon={<LogoutIcon />}>Logout</Button>
        </>
      )}
    </nav>
  );
}

export default Navbar;