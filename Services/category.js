import Category from "../Models/Schemas/category"

const createCategory = async (data) => {
    const new_category = new Category(data);
    return await new_category.save();
}

const getCategoryById = async (id) => {
    return await Category.findById(id);
}

const getAllCategories = async () => {
    return await Category.find({});    
}

const updateCategory = async (id, updated_data) => {
    return await Category.findByIdAndUpdate(id, updated_data, {new: true});
}

const deleteCategory = async (id) => {
    return await Category.findByIdAndDelete(id);
}

export const CategoryService = {createCategory, getCategoryById, getAllCategories, updateCategory, deleteCategory};