import Product from "../Models/Schemas/product"

const createProduct = async (data) => {
    const new_product = new Product(data);
    return await new_product.save();
}

const getProductById = async (id) => {
    return await Product.findById(id);
}

const getAllProducts = async () => {
    return await Product.find({});    
}

const updateProduct = async (id, updated_data) => {
    return await Product.findByIdAndUpdate(id, updated_data, {new: true});
}

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
}

export const ProductService = {createProduct, getProductById, getAllProducts, updateProduct, deleteProduct};