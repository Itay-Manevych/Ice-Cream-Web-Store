import User from "../Models/Schemas/user.js";

const createUser = async (data) => {
    const new_user = new User(data);
    return await new_user.save();
}

const getUserById = async (id) => {
    return await User.findById(id);
}

const getAllUsers = async () => {
    return await User.find({});    
}

const updateUser = async (id, updated_data) => {
    return await User.findByIdAndUpdate(id, updated_data, {new: true});
}

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
}

export const userService = {createUser, getUserById, getAllUsers, updateUser, deleteUser};