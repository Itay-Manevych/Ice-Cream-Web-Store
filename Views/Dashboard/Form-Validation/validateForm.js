import { Error } from "../Visual-Validation/error.js";
import { Valid } from "../Visual-Validation/valid.js";
import { Validation } from "./validation.js";
import { UserFunctions } from "../User/userFunctions.js";
import { ProductFunctions } from "../Product/productFunctions.js";

const validateUserForm = async (username_input, email_input, password_input, submit_button) => {
    const elements_array = [username_input, email_input, password_input, submit_button];
    let is_valid = true;

    if (!Validation.validateString(username_input.val())) {
        is_valid = false;
        Valid.hideAllValid(elements_array);
        Error.showError(username_input, "Username cannot be empty.");
    }
    else if(username_input.val().length > 40) {
        is_valid = false;
        Valid.hideAllValid(elements_array);
        Error.showError(username_input, "Username's length cannot be larger than 40 letters.");
    } 
    else {
        Error.hideError(username_input);
    }

    if (!Validation.validateEmail(email_input.val())) {
        is_valid = false;
        Valid.hideAllValid(elements_array);
        Error.showError(email_input, "Invalid email format.");
    } else if (await UserFunctions.checkExistingUser(email_input.val().trim())) {
        is_valid = false;
        Valid.hideAllValid(elements_array);
        Error.showError(email_input, "Email already in use");
    } else {
        Error.hideError(email_input);
    }

    if (!Validation.validateString(password_input.val().trim())) {
        is_valid = false;
        Valid.hideAllValid(elements_array);
        Error.showError(password_input, "Password cannot be empty.");
    } else {
        Error.hideError(password_input);
    }

    return is_valid;
};

const validateProductForm = async (product_input, product_select, price_input, description_input, image_input, categories_input, submit_button, is_update) => {
    const elements_array = [product_input, price_input, description_input, image_input, submit_button];
    product_select ? elements_array.push(product_select) : null;
    
    let is_valid = true;

    if (!Validation.validateString(product_input.val())) {
        is_valid = false;
        Valid.hideAllValid(elements_array);
        Error.showError(product_input, "Product name cannot be empty.");
    } 
    else if(product_input.val().length > 100) {
        is_valid = false;
        Valid.hideAllValid(elements_array);
        Error.showError(product_input, "Product name's length cannot be larger than 100 characters.");
    }
    else if(Validation.containsSpecialCharacters(product_input.val())) {
        is_valid = false;
        Valid.hideAllValid(elements_array);
        Error.showError(product_input, "Product name cannot contain special characters.");
    }
    else if(!is_update && await ProductFunctions.checkExistingProduct(product_input.val().toLowerCase())) {
        is_valid = false;
        Valid.hideAllValid(elements_array);
        Error.showError(product_input, "Product already exists.");
    } 
    else if(is_update && await ProductFunctions.checkExistingProduct(product_input.val())) {
        const selected_product_name = $("#product-names-update :selected").text();
        if(product_input.val() !== selected_product_name && selected_product_name != "") {
            is_valid = false;
            Valid.hideAllValid(elements_array);
            Error.showError(product_input, "Product already exists.");
        }
    }
    else {
        Error.hideError(product_input);
    }  
    
    if(product_select) {
        if (!Validation.validateString($("#product-names-update :selected").text())) {
            is_valid = false;
            Valid.hideAllValid(elements_array);
            Error.showError(product_select, "You must select a Product.");
        } 
        else if(await ProductFunctions.checkExistingProduct(product_select.text())) {
            is_valid = false;
            Valid.hideAllValid(elements_array);
            Error.showError(product_select, "Product already exists.");
        } 
        else {
            Error.hideError(product_select);
        }  
    }

    if (parseFloat(price_input.val()).toFixed(2) <= 0 || parseFloat(price_input.val()).toFixed(2) > 10000 || !Validation.validatePrice(price_input.val())) {
        is_valid = false;
        Valid.hideAllValid(elements_array);
        Error.showError(price_input, "Invalid price format, or price is less than $0 or greater than $10,000.");
    } else {
        Error.hideError(price_input);
    }

    if (!Validation.validateString(description_input.val())) {
        is_valid = false;
        Valid.hideAllValid(elements_array);
        Error.showError(description_input, "Description cannot be empty.");
    } 
    else if(description_input.val().length > 400) {
        is_valid = false;
        Valid.hideAllValid(elements_array);
        Error.showError(description_input, "Description length cannot be larger than 400 characters.");
    }
    else {
        Error.hideError(description_input);
    }

    if (!Validation.validateString(image_input.val())) {
        is_valid = false;
        Valid.hideAllValid(elements_array);
        Error.showError(image_input, "Image cannot be empty.");
    } 
    else {
        Error.hideError(product_input);
    }  

    if (!Validation.validateArray(categories_input.val())) {
        is_valid = false;
        Valid.hideAllValid(elements_array);
        Error.showError(categories_input, "Select at least 1 category.");
    } else {
        Error.hideError(categories_input);
    }

    return is_valid;
};

export const ValidateForm = {validateUserForm, validateProductForm};