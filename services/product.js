import Product from "../Models/Schemas/Product";

const createProduct = async (id, name, description, image, in_stock, amount, allergies, category) => {
    const product = new Product({
        id: id,
        name: name,
        description: description,
        image: image,
        in_stock: in_stock,
        amount: amount,
        allergies: allergies,
        category: category});
    return await product.save();
}