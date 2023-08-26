import { Error } from "../Visual-Validation/error.js";
import { Valid } from "../Visual-Validation/valid.js";
import { Validation } from "../Form-Validation/validation.js";
import { CategoryFunctions } from "./categoryFunctions.js";

$(document).ready(() => {
    const updateCategory = async () => {
        const category_name = $("#update-product-categories :selected").text();
        const updated_category_name = $("#update-category-input").val();
        if(!Validation.containsSpecialCharacters(updated_category_name) && !(await CategoryFunctions.checkExistingCategory(updated_category_name, true))) {
            try {
                await $.ajax({
                    url: `/categories/name/${category_name}`,
                    method: 'PUT',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({ name: updated_category_name })
                });

                Error.hideError($("#update-category-input"));
                $(`option[value="${category_name}"]`).remove();
                $("#product-categories, #delete-product-categories, #update-product-categories").append(
                    `<option value="${updated_category_name}">${updated_category_name}</option>`
                );
                $("#delete-product-categories, #update-product-categories").prop("selectedIndex", -1);
                $("#product-categories, #delete-product-categories, #update-product-categories").trigger("chosen:updated");
                $("#update-category-input").val("");
                Valid.showValid($("#update-category-button"), "Category updated successfully");
                Valid.showValid($("#update-category-input"), "");
            } 
            catch (error) {
                console.log("AJAX error occured when updating category", error);
            }
        }
        else {
            Error.showError($("#update-category-input"), "Category already exists or value contains special character")
        }
        $("#create-category-input, #update-category-input").on("input", (event) => {
            Error.hideError($(event.target));
        });
    }
    $("#update-category-button").on("click", updateCategory);
    $("#update-category-input").on("keypress",async (event) => {
        if(event.key === "Enter") {
           await updateCategory();
        }
    });
});
