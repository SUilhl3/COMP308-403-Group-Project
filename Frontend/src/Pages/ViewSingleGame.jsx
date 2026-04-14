import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { GET_GAME, GET_MY_GAMES } from "../graphql/queries";
import { UPDATE_GAME, DELETE_GAME } from "../graphql/mutations";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
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
        variables: { id },
        refetchQueries: [{query: GET_MY_GAMES}]
      });

      alert("Game deleted successfully!");
      navigate("/games");
    } catch (err) {
      alert("Error deleting game: " + err.message);
    }
  };

  return (
    <div>
      <div class = "flex items-center justify-center">
        <div class = "w-full max-w-lg bg-gradient-to-r from-blue-200 to-cyan-200 p-20 rounded-lg shadow-lg">
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
          <p><strong>Rating:</strong> {
            game.rating !== undefined && game.rating !== null ?
            <Rating value={game.rating} max={10} disabled={true}/> 
            : "N/A"
            }
          </p>
          <p>
            <strong>Release Date:</strong>{" "}
            {game.releaseDate && !isNaN(game.releaseDate) 
              ? new Date(Number(game.releaseDate)).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <strong>Added On:</strong>{" "}
            {game.createdAt && !isNaN(game.createdAt) 
              ? new Date(Number(game.createdAt)).toLocaleDateString()
              : "N/A"}
          </p>

          <button className="mr-3 bg-blue-500 text-white font-medium px-4 py-2 rounded shadow hover:bg-blue-600 active:bg-blue-700">
            Edit
          </button>

          <button variant = "contained" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div> //view page
      ) : (
        <form onSubmit={handleUpdate}>
          <div>
            <label><b>Title:</b></label><br />
            <TextField
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label><b>Platform:</b></label><br />
            <TextField
              type="text"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
            />
          </div>

          <div>
            <label><b>Description:</b></label><br />
            <TextField
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label><b>Status:</b></label>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="Playing">Playing</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Backlog">Backlog</MenuItem>
              <MenuItem value="Re-playing">Re-playing</MenuItem>
            </Select>
          </div>

          <div>
            <label><b>Rating:</b></label><br />
            <Rating
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              max={10}
            />
          </div>

          <div>
            <label><b>Release Date:</b></label><br />
            <TextField
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label><b>Image URL:</b></label><br />
            <TextField
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>

          <br />

          <button type="submit" variant = "contained" disabled={updating} style={{ marginRight: "10px" }}>
            {updating ? "Saving..." : "Save Changes"}
          </button>

          <button type="button" variant = "contained" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      )}
      </div>
      </div>
    </div>
  );
}

export default ViewSingleGame;