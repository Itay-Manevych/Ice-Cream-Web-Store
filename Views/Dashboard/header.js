$("#product-categories, #product-names-update, #product-names-delete, #delete-product-categories, #update-product-categories, #product-categories-update").prop("selectedIndex", -1);

$(".chosen-select").chosen({
    no_results_text: "Oops, nothing found!"
});


    $("#house-icon").on("click", () => {
        window.location.href = "/";
    });

    $("#logout-icon").on("click", async () => {
        const data = {
            cookie_name: "jwt",
        }
        try {
            await $.ajax({
                url: '/dashboard', 
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function() {
                    window.location.href = '/';
                }
            });
        }
        catch(error) {
            console.log("AJAX error:", error);
        }
    });


