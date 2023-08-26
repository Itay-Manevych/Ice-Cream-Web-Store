import { Valid } from "../Visual-Validation/valid.js";

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

        } 
        catch (error) {
            console.error("Error:", error);
        }
    };

    $("#delete-product-button").on("click", deleteProduct);
});
    