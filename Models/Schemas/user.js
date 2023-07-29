import mongoose from "mongoose";

const User = new mongoose.Schema({
    _id: Number,
    user_name: String,
    email: String,
    password: String,
    is_admin: Boolean,
}, { 
    required: true,
});

export default mongoose.model("User", User);