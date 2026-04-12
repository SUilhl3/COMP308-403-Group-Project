import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    title: {type: String, required: true},
    platform: {type: String},
    description: {type: String},
    status: {type: String, enum: ["Playing", "Completed", "Backlog", "Re-playing"], default: "Backlog" },
    rating: {type: Number, min: 0, max: 10},
    releaseDate: {type: Date},
    imageUrl: {type: String},
    createdAt: {type: Date, default: Date.now}
})

export const Game = mongoose.model("Game", gameSchema);