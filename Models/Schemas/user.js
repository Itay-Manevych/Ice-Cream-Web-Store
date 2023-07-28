import mongoose from "mongoose";

const User = new mongoose.Schema({
    id: Number,
    user_name: String,
    email: String,
    password: String,
    is_admin: Boolean,
}, { 
    required: true,
    _id: false,
});

export default mongoose.model("User", User);