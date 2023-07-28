import { UserService } from "../Services/user.js";

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

const getUserById = async (req, res) => {
    try {
        const user = await UserService.getUserById(req.params.id);
        if(!user) {
            throw new Error("There is not an existing user model with that id");
        }
        res.status(201).json(user);
    }
    catch(error) {
        res.status(500).json({
            error: "Error finding an user model by id",
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
        res.status(201).json(users);
    }
    catch(error) {
        res.status(500).json({
            error: "Error getting all user models",
            message: error.message,
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const updated_user = await UserService.updateUser(req.body.id, req.body);
        res.status(201).json(updated_user);
    }
    catch(error) {
        res.status(500).json({
            error: "Error updating a user model",
            message: error.message,
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const deleted_user = await UserService.deleteUser(req.body.id);
        if(!deleted_user) {
            throw new Error("The user model you are trying to delete does not exist");
        }
        res.status(201).json(deleted_user);
    }
    catch(error) {
        res.status(500).json({
            error: "Error deleting a user model",
            message: error.message,
        })
    }
}

export const UserController = {createUser, getUserById, getAllUsers, updateUser, deleteUser};