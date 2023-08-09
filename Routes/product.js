import express from "express"
import { ProductController }  from "../Controllers/product.js";

const ProductRouter = express.Router();

ProductRouter.route('/')
.get(async (req, res) => {
        const products = await ProductController.getAllProducts(req,res);
        res.render('Products/productsdisplay', {products});
})
    .post(ProductController.createProduct);

ProductRouter.route('/id/:id')
    .get(ProductController.getProductById)
    .put(ProductController.updateProduct)
    .delete(ProductController.deleteProduct);

ProductRouter.route('/category/:name')
    .get(ProductController.getAllProductsByCategory)

export default ProductRouter;

