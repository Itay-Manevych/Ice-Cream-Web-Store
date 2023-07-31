import express from "express"
import { CategoryController }  from "../Controllers/user.js";

const CategoryRouter = express.Router();

CategoryRouter.route('/')
    .get(CategoryController.getAllCategories)
    .post(CategoryController.createCategory);

CategoryRouter.route('/:id')
    .get(CategoryController.getCategoryById)
    .put(CategoryController.updateCategory)
    .delete(CategoryController.deleteCategory);

export default CategoryRouter;

