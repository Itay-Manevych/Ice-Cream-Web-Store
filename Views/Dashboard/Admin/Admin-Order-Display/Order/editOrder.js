$(document).ready(() => {
    let selected_order_id;
    
    const updateModalInfo = async () => {
        const order = await $.ajax({
            url: `/orders/${selected_order_id}`,
            type: 'GET',
        });

        $("#edit-name").val(order.name);
        $("#edit-email").val(order.email);
        $("#edit-phone-number").val("0" + order.phone_number);
        $("#edit-city").val(order.address.city);
        $("#edit-street").val(order.address.street);
        $("#edit-apartment").val(order.address.apartment);
        $("#edit-floor").val(order.address.floor);
    }

    $('#edit-order-modal').on('show.bs.modal', async (event) =>{
        $("#confirm-edit-order-button").prop("disabled", false);
        $("#cancel-edit-order-button").prop("disabled", false);
        const button = $(event.relatedTarget);
        selected_order_id = button.data('order-id');
        $("#edit-order-success-message-container").addClass("d-none");
        await updateModalInfo()
    });
    
    console.log($("#edit-phone-number").val());
    $("#confirm-edit-order-button").on("click", async () => {
        try {
            await $.ajax({
                url: `/orders/${selected_order_id}`,
                type: 'PUT', 
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                    name: $("#edit-name").val(),
                    email: $("#edit-email").val(),
                    phone_number: $("#edit-phone-number").val(),
                    address: {
                        city: $("#edit-city").val(),
                        street: $("#edit-street").val(),
                        apartment: $("#edit-apartment").val(),
                        floor: $("#edit-floor").val()
                    }
                }),
            });
    
            $("#confirm-edit-order-button").prop("disabled", true);
            $("#cancel-edit-order-button").prop("disabled", true);

            $("#edit-order-success-message-container").removeClass("d-none");
            $(`.orderers-name-${selected_order_id}`).text("Orderer's Name:" + " " + $("#edit-name").val());
            $(`.email-${selected_order_id}`).text("Email:" + " " + $("#edit-email").val());
            $(`.phone-number-${selected_order_id}`).text("Phone Number:" + " " + $("#edit-phone-number").val());
            $(`.city-${selected_order_id}`).text("City:" + " " + $("#edit-city").val());
            $(`.street-${selected_order_id}`).text("Street:" + " " + $("#edit-street").val());
            $(`.apartment-${selected_order_id}`).text("Apartment:" + " " + $("#edit-apartment").val());
            $(`.floor-${selected_order_id}`).text("Floor:" + " " + $("#edit-floor").val());
        } 
        catch (error) {
            console.log("Error editing order", error);
        }
    }); 
})
