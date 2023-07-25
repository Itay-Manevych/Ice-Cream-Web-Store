import mongoose from "mongoose";
import allergies from "./allergies.js";

const Category = new mongoose.Schema({
    id: Number,
    name: String,
    allergies: allergies.schema,
})

export default mongoose.model("Category", Category);