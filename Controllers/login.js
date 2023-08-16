import { UserService } from "../Services/user.js";
import bcrypt from "bcryptjs";

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await UserService.getUserByEmail(email);
        if(!user) {
            throw new Error("There is not an existing user model with that email");
        }

        const password_match = bcrypt.compare(password, user.password);
        if(!password_match) {
            throw new Error("Incorrect password");
        }

        const token = jwt.sign(
            {userID: user._id, isAdmin: user.is_admin},
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" },
        )
        res.status(200).json({ message: "Login successful", token: token });
    }
    catch(error) {
        res.status(500).json({ error: "Login failed", message: error.message });
    }
}

export const LoginController = {loginUser};
