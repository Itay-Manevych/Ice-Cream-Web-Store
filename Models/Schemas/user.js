import mongoose from "mongoose";
import makeAllRequired from "./makeAllRequired.js";

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
});

makeAllRequired(User);

export default mongoose.model("User", User);