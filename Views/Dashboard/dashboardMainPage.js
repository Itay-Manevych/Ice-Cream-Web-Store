import { UserFunctions } from "./User/userFunctions.js";

$(document).ready(async () => {
    $("#confirm-delete-user-button").on("click", async () => {
        try {
            const user = await UserFunctions.getUser()
            await $.ajax({
                url: `/users/${user.email}`, 
                method: 'DELETE',
            });   
            window.location.href = '/';
        } 
        catch (error) {
            console.log("Error deleting user", error);
        }
    }); 
    
    $("cancel-delete-user-button").on("click", () => {
      $("#delete-user-modal").modal("hide");
    })
});