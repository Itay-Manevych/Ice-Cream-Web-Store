import { UserService } from "../Services/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await UserService.getUserByEmail(email);

        if(!user) {
            throw new Error("Inccorrect email or password");
        }

        const password_match = await bcrypt.compare(password, user.password);

        if(!password_match) {
            throw new Error("Inccorrect email or password");
        }

        const token = jwt.sign(
            {userEmail: user.email, isAdmin: user.is_admin},
            process.env.JWT_SECRET,
        )
        res.cookie('jwt', token);
        res.status(200).json({ message: "Login successful" });
    }
    catch(error) {
        res.status(500).json({ error: "Login failed", message: error.message });
    }
}

export const LoginController = {loginUser};
