import User from "../Models/Schemas/user.js";
import bcrypt from "bcryptjs";

const createUser = async (data) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password,salt);
    data.password = hash;
    const new_user = new User(data);
    return await new_user.save();
}

const getUserByEmail = async (email) => {
    return await User.findOne({ email });
}

const getAllUsers = async () => {
    return await User.find({});    
}

const updateUserByEmail = async (email, updated_data) => {
    return await User.findOneAndUpdate({ email }, updated_data, { new: true });
};
  
const deleteUserByEmail = async (email) => {
    return await User.findOneAndDelete({ email });
};

export const UserService = {createUser, getUserByEmail, getAllUsers, updateUserByEmail, deleteUserByEmail};