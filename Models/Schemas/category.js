import mongoose from "mongoose";
import makeAllRequired from "./makeAllRequired.js";

const Category = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    }
});

makeAllRequired(Category);

export default mongoose.model("Category", Category);