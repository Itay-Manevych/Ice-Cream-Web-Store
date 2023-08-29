$(document).ready(() => {
    let selected_order_id;
    $('#delete-order-modal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget);
        selected_order_id = button.data('order-id');
        $("#confirm-delete-order-button").prop("disabled", false);
        $("#cancel-delete-order-button").prop("disabled", false);
        $("#delete-order-success-message-container").addClass("d-none");
    });

    $("#confirm-delete-order-button").on("click", async () => {
        try {
            $("#confirm-delete-order-button").prop("disabled", true);
            $("#cancel-delete-order-button").prop("disabled", true);

            await $.ajax({
                url: `/orders/${selected_order_id}`,
                type: 'DELETE',
            });

            $("#delete-order-success-message-container").removeClass("d-none");
            
            console.log($(`.user-order-${selected_order_id}`).nextAll("#user-order").first());
            if($(`.user-order-${selected_order_id}`).nextAll("#user-order").first()) {
                $(`.user-order-${selected_order_id}`).nextAll("#user-order").first().css("border-top", "none");
                $(`.user-order-${selected_order_id}`).nextAll("#user-order").first().css("padding-bottom", "0");
                $(`.user-order-${selected_order_id}`).nextAll("#user-order").first().css("margin-bottom", "0.5rem");
            };

            $(`.user-order-${selected_order_id}`).remove();

            if($(".card-body").find("#user-order").length === 0) {
                $("#no-orders-pargraph-container").removeClass("d-none");
            }
        } 
        catch (error) {
            console.log("Error deleting order", error);
        }
    }); 

    $("#cancel-delete-order-button").on("click", () => {
        $("#delete-order-modal").modal("hide");
    });
});