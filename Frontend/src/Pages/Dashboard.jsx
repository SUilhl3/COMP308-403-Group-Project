import { useQuery, useMutation } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";
import { LOGOUT_USER } from "../graphql/mutations";

function Dashboard() {
  const { data, loading, error } = useQuery(GET_CURRENT_USER);
  const [logoutUser] = useMutation(LOGOUT_USER, {
  refetchQueries: [GET_CURRENT_USER],
  awaitRefetchQueries: true
  });

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>{error.message}</p>;
  
  const handleLogout = async (e) => {
    e.preventDefault();

    await logoutUser();
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {data.me.username}</p>
      <p>Email: {data.me.email}</p>
      <p>Role: {data.me.role}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;