import express from "express"
import { ProductController }  from "../Controllers/product.js";

const ProductRouter = express.Router();

ProductRouter.route('/')
    .get(ProductController.getAllProducts)
    .post(ProductController.createProduct)

ProductRouter.route('/:id')
    .get(ProductController.getProductById)
    .put(ProductController.updateProduct)
    .delete(ProductController.deleteProduct)

export default ProductRouter;

