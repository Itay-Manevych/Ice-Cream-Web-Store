$("#product-names-update, #product-categories, #delete-product-categories, #update-product-categories").prop("selectedIndex", -1);

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
});

