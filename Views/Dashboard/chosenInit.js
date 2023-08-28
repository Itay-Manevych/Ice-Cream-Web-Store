$("#product-categories, #product-names-update, #product-names-delete, #delete-product-categories, #update-product-categories, #product-categories-update").prop("selectedIndex", -1);

$(".chosen-select").chosen({
    no_results_text: "Oops, nothing found!"
});