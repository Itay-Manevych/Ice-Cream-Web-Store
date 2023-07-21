import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: Number,
    userName: Number,
    email: String,
    paswword: Number,
    is_admin: Boolean,
})

export default mongoose.model("user", userSchema);