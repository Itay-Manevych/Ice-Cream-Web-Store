import express from "express"
import { ProductController }  from "../Controllers/product.js";


const ProductRouter = express.Router();

ProductRouter.route('/')
.get(async (req, res) => {
        const products = await ProductController.getAllProducts(req,res);
        const searchValue = req.query.search || ''; // Get the search query from the URL
        // Fetch your products and render the template
        res.render('Products/productsDisplay.ejs', { products, searchValue });
})
    .post(ProductController.createProduct);

ProductRouter.route('/id/:id')
    .get(ProductController.getProductById)
    .put(ProductController.updateProduct)
    .delete(ProductController.deleteProduct);

ProductRouter.route('/category/:name')
    .get(ProductController.getAllProductsByCategory)

export default ProductRouter;

