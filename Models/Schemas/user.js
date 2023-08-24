import mongoose from "mongoose";

const User = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: String,
    is_admin: Boolean,
}, { 
    required: true,
});

export default mongoose.model("User", User);