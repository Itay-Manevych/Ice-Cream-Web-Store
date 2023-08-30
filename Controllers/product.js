import { ProductService } from "../Services/product.js";

const createProduct = async (req, res) => {
    try {
        const new_product = await ProductService.createProduct(req.body);
        res.status(201).json(new_product);
    }
    catch(error) {
        res.status(500).json({
        error: "Error creating a product model", 
        message: error.message,
        });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await ProductService.getProductById(req.params.id);
        if(!product) {
            throw new Error("There is not an existing product model with that id");
        }
        res.status(201)
        return product;
    }
    catch(error) {
        res.status(500).json({
            error: "Error finding a product model by id",
            message: error.message,
        });
    }
}

const getProductByName = async (req, res) => {
    try {
        const product = await ProductService.getProductByName(req.params.name);
        if(!product) {
            throw new Error("There is not an existing product model with that name");
        }
        res.status(201);
        return product;
    }
    catch(error) {
        res.status(500).json({
            error: "Error finding a product model by name",
            message: error.message,
        });
    }
}

const getAllProductsByCategory = async (req, res) => {
    try {
        const products = await ProductService.filterProductsByCategory(req.params.name);
        if(products.length === 0) {
            return undefined;
        }
        res.status(201);
        return products;
    }
    catch(error) {
        res.status(500).json({
            error: `Error getting all products in ${req.params.name} category`,
            message: error.message,
        })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductService.getAllProducts();
        res.status(201);
        return products;
    }
    catch(error) {
        res.status(500).json({
            error: "Error getting all product models",
            message: error.message,
        })
    }
}

const getTopProducts = async (req, res) => {
    try {
        const top_products = await ProductService.getTopProducts();
        res.status(200);
        return top_products;
    } catch (error) {
        res.status(500).json({
            error: "Error getting top products",
            message: error.message,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const updated_product = await ProductService.updateProduct(req.params.id, req.body);
        if(req.params.is_update_category === undefined) {
            res.status(201).json(updated_product);
        }
        else {
            return updated_product;
        }
    }
    catch(error) {
        res.status(500).json({
            error: "Error updating a product model",
            message: error.message,
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const deleted_product = await ProductService.deleteProduct(req.params.id);
        if(!deleted_product) {
            throw new Error("The product model you are trying to delete does not exist");
        }
        res.status(201).json(deleted_product);
    }
    catch(error) {
        res.status(500).json({
            error: "Error deleting a product model",
            message: error.message,
        })
    }
}

export const ProductController = {createProduct, getProductById, getProductByName, getAllProductsByCategory, getAllProducts, getTopProducts, updateProduct, deleteProduct};