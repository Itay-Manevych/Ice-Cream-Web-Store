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

    $(".product-button").on("click", () => {
        window.location.href = '/dashboard/admin-product';
    })

    $(".category-button").on("click", () => {
        window.location.href = '/dashboard/admin-category';
    })

    $(".order-button").on("click", () => {
        window.location.href = '/dashboard/admin-order';
    })

    $(".statistics-button").on("click", () => {
        window.location.href = '/dashboard/statistics';
    })

    $("#dashboard-icon").on("click", () => {
        window.location.href = '/dashboard/';
    })
})



