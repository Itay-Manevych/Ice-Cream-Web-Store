import { Error } from "../Visual-Validation/error.js";
import { Valid } from "../Visual-Validation/valid.js";
import { ValidateForm } from "../Form-Validation/validateForm.js";
import { ProductFunctions } from "./productFunctions.js";

$(document).ready(() => {
    const createProduct = async () => {
        if(await ValidateForm.validateProductForm($("#product-name"), undefined, $("#product-price"), $("#product-description"), $("#product-image"), $("#product-categories"), $("#create-product-button"), false)) {
            try {
                await $.ajax({
                    url: '/products', 
                    method: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        name: $("#product-name").val(),
                        price: parseFloat($("#product-price").val()).toFixed(2),
                        amount_purchased: 0,
                        description: $("#product-description").val(),
                        image: $("#product-image").val(),
                        categories: $("#product-categories").val().map(categoryName => ({ name: categoryName })),
                        allergies: {
                            lactose: $("#product-allergens").val().includes("lactose"),
                            nuts: $("#product-allergens").val().includes("nuts"),
                            soy: $("#product-allergens").val().includes("soy"),
                            gluten: $("#product-allergens").val().includes("gluten"),
                            eggs: $("#product-allergens").val().includes("eggs"),
                        } 
                    }),
                });
                
                const product = await ProductFunctions.getProduct($("#product-name").val());
                
                $(`option[value="no-data-update-product"]`).remove();
                $(`option[value="no-data-delete-product"]`).remove();

                $("#product-names-delete, #product-names-update").append(
                    `<option value="${product._id}">${product.name}</option>`
                );
    
                $("#product-names-delete, #product-names-update").prop("selectedIndex", -1);
    
                $("#product-names-delete, #product-names-update").trigger("chosen:updated");
                Valid.showValid($("#create-product-button"),"Product Created Successfully");
                Valid.showValid($("#product-name"),"");
                Valid.showValid($("#product-price"),"");
                Valid.showValid($("#product-description"),"");
                Valid.showValid($("#product-image"),"");

            } 
            catch (error) {
                console.error("Error:", error);
            }
        }
        $("#product-name, #product-price, #product-description, #product-image").on("input", (event) => {
            Error.hideError($(event.target));
        });
    
        $("#product-categories").on("change", () => {
            Error.hideError($("#product-categories"));
        });
    };

    $("#create-product-button").on("click", createProduct);

    $("#product-name, #product-price, #product-description, #product-image").on("keydown",async (event) => {
        if(event.key === "Enter") {
            event.preventDefault();
            await createProduct();
        }
    });

});
    