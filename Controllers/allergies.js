import { AllergiesService } from "../Services/allergies.js";

const createAllergies = async (req, res) => {
    try {
        const new_allergies = await AllergiesService.createAllergies(req.body);
        await res.status(201).json(new_allergies);
    }
    catch(error) {
        res.status(500).json({
        error: "Error creating allergies", 
        message: error.message
        });
    }
}

const getAllergiesById = async (req, res) => {
    try {
        const allergies = await AllergiesService.getAllergiesById(req.body.id);
        res.status(201).json(allergies);
    }
    catch(error) {
        res.status(500).json({
            error: "Error finding allergies by id",
            message: error.message
        });
    }
}

const getAllAllergies = async (req, res) => {
    try {
        const allergies = await AllergiesService.getAllAllergies();
        res.status(201).json(allergies);
    }
    catch(error) {
        res.status(500).json({
            error: "Error getting all allergies",
            message: error.message
        })
    }
}

const updateAllergies = async (req, res) => {
    try {
        const updated_allergies = await AllergiesService.updateAllergies(req.body.id,req.body);
        res.status(201).json(updated_allergies);
    } 
    catch(error) {
        res.status(500).json({
            error: "Error updating allergies",
            message: error.message
        })
    }
}

const deleteAllergies = async (req, res) => {
    try {
        const deleted_allergies = await AllergiesService.deleteAllergies(req.body.id);
        res.status(201).json(deleted_allergies);
    }
    catch(error) {
        res.status(500).json({
            error: "Error deleting an allergies",
            message: error.message
        })
    }
}

export const AllergiesController = {createAllergies, getAllergiesById, getAllAllergies, updateAllergies, deleteAllergies};