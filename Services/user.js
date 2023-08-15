import User from "../Models/Schemas/user.js";
import bcrypt from "bcryptjs";

const createUser = async (data) => {
    console.log(data);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password,salt);
    data.password = hash;
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

export const UserService = {createUser, getUserById, getAllUsers, updateUser, deleteUser};