import express from "express"
import { ProductController }  from "../Controllers/product.js";
import { CategoryController } from "../Controllers/category.js";

const ProductRouter = express.Router();

ProductRouter.route('/')
.get(async (req, res) => {
        const categories = await CategoryController.getAllCategories(req,res);
        const products = await ProductController.getAllProducts(req,res);
        res.render('Partials/Products/productsDisplay.ejs', {products: products, categories: categories});
})
.post(ProductController.createProduct);

ProductRouter.route('/id/:id')
    .get(async (req,res) => {
        const product = await ProductController.getProductById(req,res);
        res.render('Partials/Products/productDisplay.ejs', {product: product});
    })
    .put(ProductController.updateProduct)
    .delete(ProductController.deleteProduct);

ProductRouter.route('/name/:name')
    .get(async (req,res) => {
        const product = await ProductController.getProductByName(req,res);
        res.json(product);
    })

ProductRouter.route('/category/:name')
    .get(ProductController.getAllProductsByCategory)

export default ProductRouter;
