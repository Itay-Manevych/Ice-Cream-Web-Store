const getAllCategories = async () => {
    try{
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

const checkExistingCategory = async (category_name) => {
    const categories = await getAllCategories();
    for(let i = 0; i < categories.length; i++) {
        if(categories[i].name === category_name) {
            return true;
        }
    }
    return false;
}

export const CategoryFunctions = {getAllCategories, checkExistingCategory};