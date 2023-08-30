import { Valid } from "../Visual-Validation/valid.js";
import { Error } from "../Visual-Validation/error.js";
import { ProductFunctions } from "../Product/productFunctions.js";
import { CategoryFunctions } from "./categoryFunctions.js";

$(document).ready(() => {
    const deleteCategory = async () => {
        const category_name = $("#delete-product-categories :selected").val();
        if(!(await ProductFunctions.checkExistingProductByCategory(category_name))) {
            try {
                await $.ajax({
                    url: `/categories/name/${category_name}`,
                    method: 'DELETE',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({ name: category_name })
                });
                Error.hideError($("#delete-category-button"));

                $(`option[value="${category_name}"]`).remove();
        
                $("#delete-product-categories, #update-product-categories").prop("selectedIndex", -1);
    
                $("#product-names-update, #delete-product-categories, #update-product-categories").trigger("chosen:updated");
        
                Valid.showValid($("#delete-category-button"), "Category Deleted Successfully");

                if((await CategoryFunctions.getAllCategories()).length === 0) {
                    $("#update-product-categories").append(
                        `<option value="no-data-update-category" disabled>No categories available </option>`
                    );

                    $("#delete-product-categories").append(
                        `<option value="no-data-delete-category" disabled>No categories available</option>`
                    );

                    $("#delete-product-categories, #update-product-categories").trigger("chosen:updated");
                }
            } 
            catch (error) {
                console.log("AJAX error occured when deleting category", error);
            }
        }
        else {
            Error.showError($("#delete-category-button"), "This category has existing products");
        }
    };

    $("#delete-category-button").on("click", deleteCategory);
});