import mongoose from "mongoose";
import allergies from "./allergies.js";

const category_schema = new mongoose.Schema({
    id: Number,
    name: String,
    allergies: allergies.schema
})

export default mongoose.model("category", category_schema);