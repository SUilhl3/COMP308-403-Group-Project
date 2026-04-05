import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";

function Dashboard() {
  const { data, loading, error } = useQuery(GET_CURRENT_USER);

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {data.me.username}</p>
      <p>Email: {data.me.email}</p>
      <p>Role: {data.me.role}</p>
    </div>
  );
}

export default Dashboard;