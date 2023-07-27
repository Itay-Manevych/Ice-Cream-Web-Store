import { ProductService } from "../Services/product";

const createProduct = async (req, res) => {
    try {
        const new_product = await ProductService.createProduct(req.body);
        res.status(201).json(new_product);
    }
    catch(error) {
        res.status(500).json({
        error: "Error creating a product", 
        message: error.message
        });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await ProductService.getProductById(req.body.id);
        res.status(201).json(product);
    }
    catch(error) {
        res.status(500).json({
            error: "Error finding a product by id",
            message: error.message
        });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const Products = await ProductService.getAllProducts();
        res.status(201).json(products);
    }
    catch(error) {
        res.status(500).json({
            error: "Error getting all products",
            message: error.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const updated_product = await ProductService.updateProduct(req.body.id, req.body);
        res.status(201).json(updated_product);
    }

    catch(error) {
        res.status(500).json({
            error: "Error updating a product",
            message: error.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const deleted_product = await ProductService.deleteProduct(req.body.id);
        res.status(201).json(deleted_product);
    }

    catch(error) {
        res.status(500).json({
            error: "Error deleting a product",
            message: error.message
        })
    }
}

export const ProductController = {createProduct, getProductById, getAllProducts, updateProduct, deleteProduct};