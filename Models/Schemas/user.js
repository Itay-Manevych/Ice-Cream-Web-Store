import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: Number,
    user_name: String,
    email: String,
    password: String,
    is_admin: Boolean,
})

export default mongoose.model("user", userSchema);