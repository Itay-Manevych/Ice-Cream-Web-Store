import mongoose from "mongoose";

const User = new mongoose.Schema({
    id: Number,
    user_name: String,
    email: String,
    password: String,
    is_admin: Boolean,
})

export default mongoose.model("User", User);