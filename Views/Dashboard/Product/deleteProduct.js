import { Valid } from "../Visual-Validation/valid.js";
import { ProductFunctions } from "./productFunctions.js";

$(document).ready(() => {
    const deleteProduct = async () => {
        const product_id = $("#product-names-delete :selected").val();
        try {
            await $.ajax({
                url: `/products/id/${product_id}`, 
                method: 'DELETE'
            });
            
            $(`option[value="${$("#product-names-delete :selected").val()}"]`).remove();
            
            $("#product-names-delete, #product-names-update").prop("selectedIndex", -1);
    
            $("#product-names-delete, #product-names-update").trigger("chosen:updated");
            Valid.showValid($("#delete-product-button"),"Product Deleted Successfully");

            if((await ProductFunctions.getAllProducts()).length === 0) {
                $("#product-names-update").append(
                    `<option value="no-data-update-product" disabled>No products available </option>`
                );

                $("#product-names-delete").append(
                    `<option value="no-data-delete-product" disabled>No products available</option>`
                );

                $("#product-names-update, #product-names-delete").trigger("chosen:updated");
            }
        } 
        catch (error) {
            console.error("Error:", error);
        }
    };

    $("#delete-product-button").on("click", deleteProduct);
});
    