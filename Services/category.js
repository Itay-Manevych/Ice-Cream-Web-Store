import Category from "../Models/Schemas/category.js";

const createCategory = async (data) => {
    const new_category = new Category(data);
    return await new_category.save();
}

const getCategoryByName = async (name) => {
    const filter = { name: name };
    return await Category.findOne(filter);
}

const getAllCategories = async () => {
    return await Category.find({});    
}

const updateCategory = async (name, updated_data) => {
    const filter = { name: name }
    return await Category.findOneAndUpdate(filter, updated_data, {new: true});
}

const deleteCategory = async (name) => {
    const filter = { name: name }
    return await Category.findOneAndDelete(filter);
}

export const CategoryService = {createCategory, getCategoryByName, getAllCategories, updateCategory, deleteCategory};