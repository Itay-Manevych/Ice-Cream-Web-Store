import mongoose from "mongoose";

const Category = new mongoose.Schema({
    _id: Number,
    name: String,
}, {
    required: true,
});

export default mongoose.model("Category", Category);