import { Valid } from "../Visual-Validation/valid.js";
import { Error } from "../Visual-Validation/error.js";
import { ValidateForm } from "../Form-Validation/validateForm.js";
import { ProductFunctions } from "./productFunctions.js";

const resetValues = () => {
    $("#product-input-update").val("");

    $("#product-price-update").val("");
    
    $("#product-description-update").val("");
    
    $("#product-image-update").val("");
    
    $("#product-categories-update").val([]);
    $("#product-categories-update").trigger("chosen:updated");
    
    $("#product-allergens-update").val([]);
    $("#product-allergens-update").trigger("chosen:updated");
}

const showProductInfo = (product) => {
    $("#product-input-update").val(product.name);

    $("#product-price-update").val(product.price);

    $("#product-description-update").val(product.description);

    $("#product-image-update").val(product.image);

    const selected_categories = product.categories.map(category => category.name);
    $("#product-categories-update").val(selected_categories);
    $("#product-categories-update").trigger("chosen:updated");

    const selected_allergies = Object.keys(product.allergies).filter(allergy => product.allergies[allergy]);
    $("#product-allergens-update").val(selected_allergies);
    $("#product-allergens-update").trigger("chosen:updated");
}

$(document).ready(() => {
    resetValues();

    $("#product-names-update").on("change", async () => {
        const product_name = $("#product-names-update :selected").text();
        const product = await ProductFunctions.getProduct(product_name);
        showProductInfo(product);
    });

    const updateProduct = async () => {
        const product_id = $("#product-names-update :selected").val();
        if (await ValidateForm.validateProductForm($("#product-input-update"), $("#product-names-update"), $("#product-price-update"), $("#product-description-update"), $("#product-image-update"), $("#product-categories-update"), $("#update-product-button"), true)) 
        {
            try {
                await $.ajax({
                    url: `/products/id/${product_id}`, 
                    method: 'PUT',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        name: $("#product-input-update").val(),
                        price: parseFloat($("#product-price-update").val()).toFixed(2),
                        description: $("#product-description-update").val(),
                        image: $("#product-image-update").val(),
                        categories: $("#product-categories-update").val().map(categoryName => ({ name: categoryName })),
                        allergies: {
                            lactose: $("#product-allergens-update").val().includes("lactose"),
                            nuts: $("#product-allergens-update").val().includes("nuts"),
                            soy: $("#product-allergens-update").val().includes("soy"),
                            gluten: $("#product-allergens-update").val().includes("gluten"),
                            eggs: $("#product-allergens-update").val().includes("eggs"),
                        }
                    }),
                });
    
                const product = await ProductFunctions.getProduct($("#product-input-update").val());
                $(`option[value="${product._id}"]`).remove();
    
                $("#product-names-delete, #product-names-update").append(
                    `<option value="${product._id}">${product.name}</option>`
                );
    
                $("#product-names-delete, #product-names-update").prop("selectedIndex", -1);
    
                $("#product-names-delete, #product-names-update").trigger("chosen:updated");
                
                Valid.showValid($("#update-product-button"),"Product Updated Successfully");
                Valid.showValid($("#product-input-update"),"");
                Valid.showValid($("#product-price-update"),"");
                Valid.showValid($("#product-description-update"),"");
                Valid.showValid($("#product-image-update"),"");

            } 
            catch (error) {
                console.error("Error:", error);
            }
        }

        $("#product-input-update, #product-price-update, #product-description-update").on("input", (event) => {
            Error.hideError($(event.target));
        });
    
        $("#product-categories-update").on("change", () => {
            Error.hideError($("#product-categories-update"));
        });
        
    };
    $("#update-product-button").on("click", updateProduct);

    $("#product-input-update, #product-price-update, #product-description-update, #product-image-update").on("keydown",async (event) => {
        if(event.key === "Enter") {
            event.preventDefault();
            await updateProduct();
        }
    });

})
