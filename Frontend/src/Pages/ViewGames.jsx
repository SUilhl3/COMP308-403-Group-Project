import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_MY_GAMES } from "../graphql/queries";
import Rating from "@mui/material/Rating";
function ViewGames() {
  const { loading, error, data } = useQuery(GET_MY_GAMES);

  if (loading) return <p>Loading games...</p>;
  if (error) return <p>Error loading games: {error.message}</p>;

  const games = data?.myGames || [];

  return (
    <div>
      <h1>My Games</h1>

      {games.length === 0 ? (
        <p>No games added yet.</p>
      ) : (
        <div class = "flex items-center justify-center">
         <div class = "w-full max-w-lg bg-gradient-to-r from-blue-200 to-cyan-200 p-20 rounded-lg shadow-lg">
         {games.map((game) => (
            <div
              key={game.id}
              style={{
                border: "4px solid #ccc",
                padding: "16px",
                marginBottom: "16px",
                borderRadius: "8px"
              }}
            >
              <h2>{game.title}</h2>

              {game.imageUrl && (
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  style={{ width: "200px", height: "auto" }}
                />
              )}

              <p><strong>Platform:</strong> {game.platform || "N/A"}</p>
              <p><strong>Status:</strong> {game.status || "N/A"}</p>
              <p><strong>Rating:</strong> {
                game.rating !== undefined && game.rating !== null ?
                <Rating value={game.rating} max={10} disabled={true}/> 
                : "N/A"
                }
              </p>

              <Link to={`/game/${game.id}`}>View Details</Link>
            </div>
          ))}
        </div>
        </div>
      )}
    </div>
    
  );
}

export default ViewGames;