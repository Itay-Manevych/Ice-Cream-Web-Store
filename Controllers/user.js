import { UserService } from "../Services/user";

const createUser = async (req, res) => {
    try {
        const new_user = await UserService.createUser(req.body);
        res.status(201).json(new_user);
    }
    catch(error) {
        res.status(500).json({
        error: "Error creating a user", 
        message: error.message
        });
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await UserService.getUserById(req.body.id);
        res.status(201).json(user);
    }
    catch(error) {
        res.status(500).json({
            error: "Error finding a user by id",
            message: error.message
        });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const Users = await UserService.getAllUsers();
        res.status(201).json(users);
    }
    catch(error) {
        res.status(500).json({
            error: "Error getting all users",
            message: error.message
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
            error: "Error updating a user",
            message: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const deleted_user = await UserService.deleteUser(req.body.id);
        res.status(201).json(deleted_user);
    }

    catch(error) {
        res.status(500).json({
            error: "Error deleting a user",
            message: error.message
        })
    }
}

export const UserController = {createUser, getUserById, getAllUsers, updateUser, deleteUser};