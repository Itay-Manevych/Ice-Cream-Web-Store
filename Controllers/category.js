import { CategoryService } from "../Services/category.js";
import { ProductController } from "./product.js";

const createCategory = async (req, res) => {
    try {
        const new_category = await CategoryService.createCategory(req.body);
        res.status(201).json(new_category);
    }
    catch(error) {
        res.status(500).json({
        error: "Error creating a category model", 
        message: error.message,
        });
    }
}

const getCategoryByName = async (req, res) => {
    try {
        const category = await CategoryService.getCategoryByName(req.params.name);
        if(!category) {
            throw new Error("There is not an existing category model with that name");
        }
        res.status(201).json(category);
    }
    catch(error) {
        res.status(500).json({
            error: "Error finding a category model by name",
            message: error.message,
        });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryService.getAllCategories();
        res.status(201);
        return categories;
    }
    catch(error) {
        res.status(500).json({
            error: "Error getting all category models",
            message: error.message,
        })
    }
}

const updateCategory = async (req, res) => {
    try {
        const old_category_name = req.query.old_name;
        const new_category_name = req.body.name;
        const updated_category = await CategoryService.updateCategory(old_category_name, req.body);
        const products = await ProductController.getAllProductsByCategory({ params: { name: old_category_name } }, res);
        if(products !== undefined) {
            for (const product of products) {
                const updatedCategories = product.categories.map(category => {
                    if (category.name === old_category_name) {
                        return { name: new_category_name }; 
                    }
                    return category;
                });
    
                await ProductController.updateProduct({ params: { id: product._id, is_update_category: true}, body: { ...product, categories: updatedCategories}});
            }
        }

        res.status(201).json({updated_category});
    }
    catch(error) {
        res.status(500).json({
            error: "Error updating a category model",
            message: error.message,
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const deleted_category = await CategoryService.deleteCategory(req.params.name);
        if(!deleted_category) {
            throw new Error("The category model you are trying to delete does not exist");
        }
        res.status(201).json(deleted_category);
    }
    catch(error) {
        res.status(500).json({
            error: "Error deleting a category model",
            message: error.message,
        })
    }
}

export const CategoryController = {createCategory, getCategoryByName, getAllCategories, updateCategory, deleteCategory};