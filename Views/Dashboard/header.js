$("#product-categories, #product-names-update, #product-names-delete").prop("selectedIndex", -1);
// #delete-product-categories, #update-product-categories, #product-categories-update"
$(".chosen-select").chosen({
    no_results_text: "Oops, nothing found!"
});

$(document).ready(() => {
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

    $("#product-button").on("click", () => {
        window.location.href = '/dashboard/admin-product';
    })
})



