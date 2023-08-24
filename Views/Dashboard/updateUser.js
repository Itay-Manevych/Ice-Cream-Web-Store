import { Error } from "./Visual-Validation/error.js";
import { Valid } from "./Visual-Validation/valid.js";
import { ValidateForm } from "./Form-Validation/validateForm.js";

$(document).ready(() => {
    const changeIcon = (input, icon) => {
        input.attr("type") === "password" 
        ? (input.attr("type","input"), icon.removeClass().addClass("bi bi-eye-slash-fill")) 
        : (input.attr("type","password"), icon.removeClass().addClass("bi bi-eye-fill"));
    }
    
    $("#eye-icon").on("click", () => changeIcon($("#password"), $("#eye-icon")));
    
    $("#username, #email, #password").on("input", (event) => {
        Error.hideError($(event.target));
    });
    
    $("#user-details-button").on("click",async (event) => {
        event.preventDefault();
        
        if(await ValidateForm.validateUserForm($("#username"), $("#email"), $("#password"))) {
            try {
                const email = $("#email").val();
                const user = await $.ajax({
                    url: `/users/${email}`,
                    type: 'GET',
                });
                if (user) {
                    await $.ajax({
                        url: '/dashboard/update-details', 
                        method: 'POST',
                        dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            username: $("#username").val(),
                            email: $("#email").val(),
                            password: $("#password").val()
                        })
                    });
                    Valid.showValid($("#user-details-button"),"User updated successfully");
                    Valid.showValid($("#username"),"");
                    Valid.showValid($("#email"),"");
                    Valid.showValid($("#password"),"");
                    console.log($("#user-username"), $("#user-username"));
                    $("#user-username").text($("#username").val());
                }
            } 
            catch (error) {
                console.log("Error updating user details:", error);
            }
        }
    });
})
