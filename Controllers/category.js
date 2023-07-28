import { CategoryService } from "../Services/category.js";

const createCategory = async (req, res) => {
    try {
        const new_category = await CategoryService.createCategory(req.body);
        await res.status(201).json(new_category);
    }
    catch(error) {
        res.status(500).json({
        error: "Error creating a category", 
        message: error.message
        });
    }
}

const getCategoryById = async (req, res) => {
    try {
        const category = await CategoryService.getCategoryById(req.body.id);
        res.status(201).json(category);
    }
    catch(error) {
        res.status(500).json({
            error: "Error finding a category by id",
            message: error.message
        });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryService.getAllCategorys();
        res.status(201).json(categories);
    }
    catch(error) {
        res.status(500).json({
            error: "Error getting all categories",
            message: error.message
        })
    }
}

const updateCategory = async (req, res) => {
    try {
        const updated_category = await CategoryService.updateCategory(req.body.id,req.body);
        res.status(201).json(updated_category);
    } 
    catch(error) {
        res.status(500).json({
            error: "Error updating a category",
            message: error.message
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const deleted_category = await CategoryService.deleteCategory(req.body.id);
        res.status(201).json(deleted_category);
    }
    catch(error) {
        res.status(500).json({
            error: "Error deleting a category",
            message: error.message
        })
    }
}

export const CategoryController = {createCategory, getCategoryById, getAllCategories, updateCategory, deleteCategory};