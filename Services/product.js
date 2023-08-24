import Product from "../Models/Schemas/product.js";

const createProduct = async (data) => {
    const new_product = new Product(data);
    return await new_product.save();
}

const getProductById = async (id) => {
    return await Product.findById(id);
}

const getProductByName = async (name) => {
  return await Product.findOne({ name: name });
}

const filterProductsByCategory = async (category_name) => {
    const pipeline = [
      {
        $match: {
          "categories.name": category_name
        }
      }
    ];

    return await Product.aggregate(pipeline);
};

const getAllProducts = async () => {
    return await Product.find({});    
}

const getTopProducts = async () => {
    return await Product.find().sort({ amount_purchased: -1 }).limit(5);
};

const updateProduct = async (id, updated_data) => {
    return await Product.findByIdAndUpdate(id, updated_data, {new: true});
}

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
}

export const ProductService = {createProduct, getProductById, getProductByName, filterProductsByCategory, getAllProducts, getTopProducts, updateProduct, deleteProduct};