import express from "express"
import { CategoryController }  from "../Controllers/category.js";

const CategoryRouter = express.Router();

CategoryRouter.route('/')
    .get(CategoryController.getAllCategories)
    .post(CategoryController.createCategory);

CategoryRouter.route('/name/:name')
    .get(CategoryController.getCategoryByName)
    .put(CategoryController.updateCategory)
    .delete(CategoryController.deleteCategory);

CategoryRouter.route('/all')
    .get(async (req, res) => {
        const categories = await CategoryController.getAllCategories(req,res);
        res.json(categories);
    })

export default CategoryRouter;

