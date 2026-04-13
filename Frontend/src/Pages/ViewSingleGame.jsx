import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { GET_GAME } from "../graphql/queries";
import { UPDATE_GAME, DELETE_GAME } from "../graphql/mutations";

function ViewSingleGame() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_GAME, {
    variables: { id }
  });

  const [updateGame, { loading: updating }] = useMutation(UPDATE_GAME);
  const [deleteGame, { loading: deleting }] = useMutation(DELETE_GAME);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    description: "",
    status: "",
    rating: "",
    releaseDate: "",
    imageUrl: ""
  });

  if (loading) return <p>Loading game...</p>;
  if (error) return <p>Error loading game: {error.message}</p>;

  const game = data?.game;

  if (!game) return <p>Game not found.</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditClick = () => {
    setFormData({
      title: game.title || "",
      platform: game.platform || "",
      description: game.description || "",
      status: game.status || "",
      rating: game.rating ?? "",
      releaseDate: game.releaseDate ? game.releaseDate.split("T")[0] : "",
      imageUrl: game.imageUrl || ""
    });

    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateGame({
        variables: {
          id,
          input: {
            title: formData.title,
            platform: formData.platform,
            description: formData.description,
            status: formData.status,
            rating: formData.rating === "" ? null : parseInt(formData.rating, 10),
            releaseDate: formData.releaseDate || null,
            imageUrl: formData.imageUrl
          }
        },
        refetchQueries: [{ query: GET_GAME, variables: { id } }]
      });

      alert("Game updated successfully!");
      setIsEditing(false);
    } catch (err) {
      alert("Error updating game: " + err.message);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this game?"
    );

    if (!confirmDelete) return;

    try {
      await deleteGame({
        variables: { id }
      });

      alert("Game deleted successfully!");
      navigate("/games");
    } catch (err) {
      alert("Error deleting game: " + err.message);
    }
  };

  return (
    <div>
      <h1>{game.title}</h1>

      {!isEditing ? (
        <div>
          {game.imageUrl && (
            <img
              src={game.imageUrl}
              alt={game.title}
              style={{ width: "300px", height: "auto", marginBottom: "16px" }}
            />
          )}

          <p><strong>Platform:</strong> {game.platform || "N/A"}</p>
          <p><strong>Description:</strong> {game.description || "No description"}</p>
          <p><strong>Status:</strong> {game.status || "N/A"}</p>
          <p><strong>Rating:</strong> {game.rating ?? "N/A"}</p>
          <p>
            <strong>Release Date:</strong>{" "}
            {game.releaseDate
              ? new Date(game.releaseDate).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <strong>Added On:</strong>{" "}
            {game.createdAt
              ? new Date(game.createdAt).toLocaleDateString()
              : "N/A"}
          </p>

          <button onClick={handleEditClick} style={{ marginRight: "10px" }}>
            Edit
          </button>

          <button onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      ) : (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Title:</label><br />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Platform:</label><br />
            <input
              type="text"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Description:</label><br />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Status:</label><br />
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Rating:</label><br />
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="1"
              max="10"
            />
          </div>

          <div>
            <label>Release Date:</label><br />
            <input
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Image URL:</label><br />
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>

          <br />

          <button type="submit" disabled={updating} style={{ marginRight: "10px" }}>
            {updating ? "Saving..." : "Save Changes"}
          </button>

          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default ViewSingleGame;