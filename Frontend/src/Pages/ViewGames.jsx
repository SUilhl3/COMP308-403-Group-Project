import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_MY_GAMES } from "../graphql/queries";

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
        <div>
          {games.map((game) => (
            <div
              key={game.id}
              style={{
                border: "1px solid #ccc",
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
              <p><strong>Rating:</strong> {game.rating ?? "N/A"}</p>

              <Link to={`/game/${game.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewGames;