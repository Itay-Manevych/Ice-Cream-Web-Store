import Product from "../Models/Schemas/product.js";

const createProduct = async (data) => {
    const new_product = new Product(data);
    return await new_product.save();
}

const getProductById = async (id) => {
    return await Product.findById(id);
}

const filterProductsByCategory = async (category_name) => {
    const pipeline = [
      {
        $match: {
          "categories.name": category_name
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          quantity: 1,
        }
      }
    ];

    return await Product.aggregate(pipeline);
};

const getAllProducts = async () => {
    return await Product.find({});    
}

const updateProduct = async (id, updated_data) => {
    return await Product.findByIdAndUpdate(id, updated_data, {new: true});
}

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
}

export const ProductService = {createProduct, getProductById, filterProductsByCategory, getAllProducts, updateProduct, deleteProduct};