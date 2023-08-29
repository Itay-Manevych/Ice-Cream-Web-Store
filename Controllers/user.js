import { UserService } from "../Services/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const createUser = async (req, res) => {
    try {
        const new_user = await UserService.createUser(req.body);
        res.status(201).json(new_user);
    }
    catch(error) {
        res.status(500).json({
        error: "Error creating a user model", 
        message: error.message,
        });
    }
}

const getUserByEmail = async (req, res) => {
    try {
        const user = await UserService.getUserByEmail(req.params.email);
        if(!user) {
            throw new Error("Failed getting user model by email");
        }
        res.status(201).json(user);
    }
    catch(error) {
        res.status(500).json({
            error: "Error finding a user model by email",
            message: error.message,
        });
    }
}

const getUserByToken = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if(!token) {
            return undefined;
        }
        const user_info = jwt.verify(token, process.env.JWT_SECRET)
        if(!user_info) {
            throw new Error("Token is incorrect");
        }

        const user = await UserService.getUserByEmail(user_info.userEmail);

        if(!user) {
            return undefined;
        }
        res.status(201);
        return user;
    }
    catch(error) {
        res.status(500).json({
            error: "Error finding a user model by token",
            message: error.message,
        });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
        if(!users) {
            throw new Error("There are no existing user models");
        }
        res.status(201);
        return users;
    }
    catch(error) {
        res.status(500).json({
            error: "Error getting all user models",
            message: error.message,
        })
    }
}

const updateUserByEmail = async (req, res) => {
    try {
        const updated_user = await UserService.updateUserByEmail(req.params.email, req.body);
        res.status(201).json(updated_user);
    }
    catch(error) {
        res.status(500).json({
            error: "Error updating a user model by email",
            message: error.message,
        })
    }
}

const updateUserByToken = async (req, res) => {
    try {
        const user = await getUserByToken(req, res);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);
        req.body.password = hash;
        const updated_user = await UserService.updateUserByEmail(user.email,req.body);
        res.status(201).json(updated_user);
    }
    catch(error) {
        res.status(500).json({
            error: "Error updating a user model by email",
            message: error.message,
        })
    }
}

const deleteUserByEmail = async (req, res) => {
    try {
        const deleted_user = await UserService.deleteUserByEmail(req.params.email);
        if(!deleted_user) {
            throw new Error("The user model you are trying to delete does not exist");
        }
        res.clearCookie("jwt");
        res.status(201).json(deleted_user);
    }
    catch(error) {
        res.status(500).json({
            error: "Error deleting a user model by email",
            message: error.message,
        })
    }
}

const destroyCookie = async (req,res) => {
    try {
        res.clearCookie(req.body.cookie_name);
        res.status(200).json({ message: "Cookie destroyed successfully" });
    } catch (error) {
        res.status(500).json({
            error: "Error destroying the cookie",
            message: error.message,
        });
    }
}

export const UserController = {createUser, getUserByEmail, getUserByToken, getAllUsers, updateUserByEmail, updateUserByToken, deleteUserByEmail, destroyCookie};