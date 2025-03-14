import { Error } from "../Visual-Validation/error.js";
import { Valid } from "../Visual-Validation/valid.js";
import { Validation } from "../Form-Validation/validation.js";
import { CategoryFunctions } from "./categoryFunctions.js";

$(document).ready(() => {
    const createCategory = async () => {
        const category_name = $("#create-category-input").val().trimStart().trimEnd();
        if(!Validation.containsSpecialCharacters(category_name) && !(await CategoryFunctions.checkExistingCategory(category_name, false))) {
            try {
                const response = await $.ajax({
                    url: '/categories',
                    method: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({ name: category_name }), 
                });
                Error.hideError($("#create-category-input"));
                
                $(`option[value="no-data-update-category"]`).remove();
                $(`option[value="no-data-delete-category"]`).remove();

                $("#product-categories, #delete-product-categories, #update-product-categories").append(
                    `<option value="${response.name}">${response.name}</option>`
                );
                
                $("#delete-product-categories, #update-product-categories").prop("selectedIndex", -1);
                $("#product-categories, #delete-product-categories, #update-product-categories").trigger("chosen:updated");
            
                $("#create-category-input").val("");
    
                Valid.showValid($("#create-category-button"), "Category Created Successfully");
                Valid.showValid($("#create-category-input"), "Category Created Successfully");
            } 
            catch (error) {
                console.log("AJAX error occured when creating category", error);
            }
        }
        else {
            Error.showError($("#create-category-input"), "Category already exists or value contains special character")
        }
        
        $("#create-category-input").on("input", (event) => {
            Error.hideError($(event.target));
        });
    };
    $("#create-category-button").on("click", createCategory);
    
    $("#create-category-input").on("keypress",async (event) => {
        if(event.key === "Enter") {
            event.preventDefault();
            await createCategory();
        }
    });
    
});