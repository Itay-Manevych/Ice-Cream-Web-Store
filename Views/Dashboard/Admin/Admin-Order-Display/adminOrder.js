$("#welcome").append("Order Functions");

if($(".card-body").children().length === 1) {
    $("#no-orders-pargraph-container").removeClass("d-none");
}

$(document).ready(() => {
    let selected_order_id;
    $('#delete-order-modal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget);
        selected_order_id = button.data('order-id');
        $("#delete-order-success-message").addClass("d-none");
    });
    $("#confirm-delete-order-button").on("click", async () => {
        try {
            $("#confirm-delete-order-button").prop("disabled", true);
            $("#cancel-delete-order-button").prop("disabled", true);
            const order = await $.ajax({
                url: `/orders/${selected_order_id}`,
                type: 'DELETE',
            });
            $("#delete-order-success-message").removeClass("d-none");
            $(`.user-order-${selected_order_id}`).remove();
            console.log($(".card-body").children());
            if($(".card-body").children().length === 1) {
                $("#no-orders-pargraph-container").removeClass("d-none");
            }
        } 
        catch (error) {
            console.log("Error deleting order", error);
        }
    }); 
    $("#cancel-delete-order-button").on("click", () => {
        $("#delete-order-modal").modal("hide");
    })
})    