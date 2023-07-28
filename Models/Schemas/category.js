import mongoose from "mongoose";

const Category = new mongoose.Schema({
    id: Number,
    name: String,
}, {
    required: true,
    _id: false,
});

export default mongoose.model("Category", Category);