import Allergies from "../Models/Schemas/allergies.js";

const createAllergies = async (data) => {
    const new_allergies = new Allergies(data);
    return await new_allergies.save();
}

const getAllergiesById = async (id) => {
    return await Allergies.findById(id);
}

const getAllAllergies = async () => {
    return await Allergies.find({});    
}

const updateAllergies = async (id, updated_data) => {
    return await Allergies.findByIdAndUpdate(id, updated_data, {new: true});
}

const deleteAllergies = async (id) => {
    return await Allergies.findByIdAndDelete(id);
}

export const AllergiesService = {createAllergies, getAllergiesById, getAllAllergies, updateAllergies, deleteAllergies};