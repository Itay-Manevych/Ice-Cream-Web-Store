const getAllCategories = async () => {
    try {
        const response = await $.ajax({
            url: '/categories/all', 
            type: 'GET',
        });
        return response;
    }
    catch(error) {
        console.log("AJAX error occured when retrieving all categories", error);
    }
} 

const checkExistingCategory = async (category_name, is_update) => {
    const categories = await getAllCategories();
    
    if(categories.length === 1 && is_update) {
        return false;
    }

    for(let i = 0; i < categories.length; i++) {
        if(categories[i].name.toLowerCase() === category_name.toLowerCase()) {
            return true;
        }
    }
    return false;
}

export const CategoryFunctions = {getAllCategories, checkExistingCategory};