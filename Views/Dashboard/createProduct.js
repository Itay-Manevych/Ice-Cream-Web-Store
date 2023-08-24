import { Error } from "./Visual-Validation/error.js";
import { Valid } from "./Visual-Validation/valid.js";
import { ValidateForm } from "./Form-Validation/validateForm.js";
import { ProductFunctions } from "./Functions/productFunctions.js";

$(document).ready(() => {

    $("#product-name, #product-price, #product-description, #product-quantity").on("input", (event) => {
        Error.hideError($(event.target));
    });

    $("#product-categories").on("change", (event) => {
        Error.hideError($("#product-categories"));
    });

    $("#create-product-button").on("click", async (event) => {
        event.preventDefault();
        if(await ValidateForm.validateProductForm($("#product-name"), undefined, $("#product-price"), $("#product-description"), $("#product-categories"))) {
            try {
                await $.ajax({
                    url: '/products', 
                    method: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        name: $("#product-name").val(),
                        price: $("#product-price").val(),
                        amount_purchased: 0,
                        description: $("#product-description").val(),
                        image: $("#product-image").val(),
                        categories: $("#product-categories").val().map(categoryName => ({ name: categoryName })),
                        allergies: {
                            lactose: $("#product-allergies").val().includes("lactose"),
                            nuts: $("#product-allergies").val().includes("nuts"),
                            soy: $("#product-allergies").val().includes("soy"),
                            gluten: $("#product-allergies").val().includes("gluten"),
                            eggs: $("#product-allergies").val().includes("eggs"),
                        } 
                    }),
                });

                const product = await ProductFunctions.getProduct($("#product-name").val());

                $("#product-names-update").append(
                    `<option value="${product._id}">${product.name}</option>`
                );
                
                $("#product-names-update").trigger("chosen:updated");
                Valid.showValid($("#create-product-button"),"Product Created Successfully");
                Valid.showValid($("#product-name"),"");
                Valid.showValid($("#product-price"),"");
                Valid.showValid($("#product-description"),"");
                Valid.showValid($("#product-image"),"");
                Valid.showValid($("#product-categories"),"");
                Valid.showValid($("#product-allergies"),"");
            } 
            catch (error) {
                console.error("Error:", error);
            }
        }
    });
})
