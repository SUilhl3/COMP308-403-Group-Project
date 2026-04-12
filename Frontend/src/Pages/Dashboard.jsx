import { useUser } from "../Hooks/useUser";

function Dashboard() {
  const {user} = useUser();


  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

export default Dashboard;