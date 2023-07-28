import { AllergiesService } from "../Services/allergies.js";

const createAllergies = async (req, res) => {
    try {
        const new_allergies = await AllergiesService.createAllergies(req.body);
        res.status(201).json(new_allergies);
    }
    catch(error) {
        res.status(500).json({
        error: "Error creating an allergies model", 
        message: error.message,
        });
    }
}

const getAllergiesById = async (req, res) => {
    try {
        const allergies = await AllergiesService.getAllergiesById(req.params.id);
        if(!allergies) {
            throw new Error("There is not an existing allergies model with that id");
        }
        res.status(201).json(allergies);
    }
    catch(error) {
        res.status(500).json({
            error: "Error finding an allergies model by id",
            message: error.message,
        });
    }
}

const getAllAllergies = async (req, res) => {
    try {
        const allergies = await AllergiesService.getAllAllergies();
        if(!allergies) {
            throw new Error("There are no existing allergies models");
        }
        res.status(201).json(allergies);
    }
    catch(error) {
        res.status(500).json({
            error: "Error getting all allergies models",
            message: error.message,
        })
    }
}

const updateAllergies = async (req, res) => {
    try {
        const updated_allergies = await AllergiesService.updateAllergies(req.body.id, req.body);
        res.status(201).json(updated_allergies);
    }
    catch(error) {
        res.status(500).json({
            error: "Error updating an allergies model",
            message: error.message,
        })
    }
}

const deleteAllergies = async (req, res) => {
    try {
        const deleted_allergies = await AllergiesService.deleteAllergies(req.body.id);
        if(!deleted_allergies) {
            throw new Error("The allergies model you are trying to delete does not exist");
        }
        res.status(201).json(deleted_allergies);
    }
    catch(error) {
        res.status(500).json({
            error: "Error deleting an allergies model",
            message: error.message,
        })
    }
}

export const AllergiesController = {createAllergies, getAllergiesById, getAllAllergies, updateAllergies, deleteAllergies};