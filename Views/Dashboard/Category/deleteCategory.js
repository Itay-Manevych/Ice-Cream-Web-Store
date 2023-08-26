import { Valid } from "../Visual-Validation/valid.js";

$(document).ready(() => {
    const deleteCategory = async () => {
        try {
            await $.ajax({
                url: `/categories/name/${$("#delete-product-categories :selected").val()}`,
                method: 'DELETE',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({ name: $("#delete-product-categories :selected").val() })
            });
            
            $(`option[value="${$("#delete-product-categories :selected").val()}"]`).remove();
    
            $("#delete-product-categories, #update-product-categories").prop("selectedIndex", -1);

            $("#product-names-update, #delete-product-categories, #update-product-categories").trigger("chosen:updated");
    
            Valid.showValid($("#delete-category-button"), "Category Deleted Successfully");
        } 
        catch (error) {
            console.log("AJAX error occured when deleting category", error);
        }
    };

    $("#delete-category-button").on("click", deleteCategory);
});