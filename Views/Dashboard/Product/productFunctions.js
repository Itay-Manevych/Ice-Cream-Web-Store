const getProduct = async (product_name) => {
    try {
        const response = await $.ajax({
            url: `/products/name/${product_name}`, 
            type: 'GET',
        });
        return response;
    }
    catch(error) {
        console.log("AJAX error occured when retrieving a product", error);
    }
}

const getAllProducts = async () => {
    try {
        const response = await $.ajax({
            url: '/dashboard/products', 
            type: 'GET',
        });
        return response;
    }
    catch(error) {
        console.log("AJAX error occured when retrieving all products", error);
    }
} 

const checkExistingProduct = async (product_name) => {
    const products = await getAllProducts();
    for(let i = 0; i < products.length; i++) {
        if(products[i].name === product_name) {
            return true;
        }
    }
    return false;
}

const checkExistingProductByCategory = async (category_name) => {
    const products = await getAllProducts();
    if(products !== "undefined") {
        for(let i = 0; i < products.length; i++) {
            const categories = products[i].categories.map(category => category.name);
            if(categories.includes(category_name)) {
                return true;
            }
        }
    }
    return false;
}



export const ProductFunctions = {getProduct, getAllProducts, checkExistingProduct, checkExistingProductByCategory};