import express from "express"
import { CategoryController }  from "../Controllers/category.js";

const CategoryRouter = express.Router();

CategoryRouter.route('/')
    .get(async (req, res) => {
        const products = await ProductService.getAllProducts();
        if(!products || products.length === 0) {
            throw new Error("There are no existing product models");
        }
        res.render('Products/display', { products });
    })
    .post(CategoryController.createCategory);

CategoryRouter.route('/:name')
    .get(CategoryController.getCategoryByName)
    .put(CategoryController.updateCategory)
    .delete(CategoryController.deleteCategory);

export default CategoryRouter;

