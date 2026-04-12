import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_GAME } from "../graphql/mutations";
function AddGame()
{
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

  const [addGame] = useMutation(ADD_GAME);

    const [formData, setFormData] = useState({
        title: "",
        platform: "",
        description: "",
        status: "Backlog",
        rating: 0,
        releaseDate: "",
        imageUrl: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const input = {};
        if (formData.title.trim() !== "") input.title = formData.title;
        if (formData.platform.trim() !== "") input.platform = formData.platform;
        if (formData.description.trim() !== "") input.description = formData.description;
        if (formData.status.trim() !== "") input.status = formData.status;
        if (formData.rating.trim() !== "") input.rating = parseInt(formData.rating);
        if (formData.releaseDate.trim() !== "") input.releaseDate = formData.releaseDate;
        if (formData.imageUrl.trim() !== "") input.imageUrl = formData.imageUrl;

        try {
            console.log(input);
            await addGame({
                variables: {input: input}
            })
            setMessage("Game Added Successfully!");

            setTimeout(() => {
                setMessage("")
                navigate("/games")
            }, 1500)

        } catch (error)
        {
            console.error("Error Adding Game: ", error)
        }
    }

   return (
        <>
            <div>
                <h1>Add A Game</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Platform:</label>
                        <input
                            type="text"
                            name="platform"
                            value={formData.platform}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Status:</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="Playing">Playing</option>
                            <option value="Completed">Completed</option>
                            <option value="Backlog">Backlog</option>
                            <option value="Re-playing">Re-playing</option>
                        </select>
                    </div>
                    <div>
                        <label>Rating (0-10):</label>
                        <input
                            type="number"
                            name="rating"
                            min="0"
                            max="10"
                            value={formData.rating}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Release Date:</label>
                        <input
                            type="date"
                            name="releaseDate"
                            value={formData.releaseDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Image URL:</label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button type="submit">Add Game</button>
                    </div>
                    {message && <p>{message}</p>}
                </form>
            </div>
        </>
    );
}

export default AddGame;