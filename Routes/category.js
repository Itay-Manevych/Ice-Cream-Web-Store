import express from "express"
import { CategoryController }  from "../Controllers/category.js";

const CategoryRouter = express.Router();

CategoryRouter.route('/')
    .get(CategoryController.getAllCategories)
    .post(CategoryController.createCategory);

CategoryRouter.route('/:name')
    .get(CategoryController.getCategoryByName)
    .put(CategoryController.updateCategory)
    .delete(CategoryController.deleteCategory);

export default CategoryRouter;

