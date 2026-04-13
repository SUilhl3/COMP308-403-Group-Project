import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_GAME } from "../graphql/mutations";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";

import { GET_MY_GAMES } from "../graphql/queries";

function AddGame() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    description: "",
    status: "Backlog",
    rating: "",
    releaseDate: "",
    imageUrl: "",
  });

  const [addGame] = useMutation(ADD_GAME, {
    onCompleted: () => {
      setMessage("Game Added Successfully!");

      setTimeout(() => {
        setMessage("");
        navigate("/games");
      }, 1500);
    },
    onError: (error) => {
      console.error("Error Adding Game:", error.message);
      setMessage(`Failed to add game: ${error.message}`);
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const input = {};

    if (formData.title.trim() !== "") input.title = formData.title;
    if (formData.platform.trim() !== "") input.platform = formData.platform;
    if (formData.description.trim() !== "") input.description = formData.description;
    if (formData.status.trim() !== "") input.status = formData.status;
    if (formData.rating !== "") input.rating = parseInt(formData.rating, 10);
    if (formData.releaseDate.trim() !== "") input.releaseDate = formData.releaseDate;
    if (formData.imageUrl.trim() !== "") input.imageUrl = formData.imageUrl;

    await addGame({
      variables: { input },
      refetchQueries: [{query: GET_MY_GAMES}]
    });
  };

  return (
    <>
      <div>
        <h1>Add A Game</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <TextField
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Platform:</label>
            <TextField
              type="text"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Description:</label>
            <TextField
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Status:</label>
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
            <label>Rating (0-10):</label>
            <Rating 
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              max={10}
            />
          </div>

          <div>
            <label>Release Date:</label>
            <TextField
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Image URL:</label>
            <TextField
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>

          <div>
            <Button type="submit">Add Game</Button>
          </div>

          {message && <p>{message}</p>}
        </form>
      </div>
    </>
  );
}

export default AddGame;