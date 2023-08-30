const validateEmail = (email) => {
    const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email_regex.test(email);
};

const validateString = (string) => {
    return string !== "";
}

const validatePrice = (price) => {
    const price_regex = /^[0-9]+(\.[0-9]+)?$/;
    return price_regex.test(price);
}

const validateNumber = (number) => {
    const number_regex = /^[0-9]+$/;
    return number_regex.test(number);
}

const validateArray = (array) => {
    return array.length > 0;
}

const containsSpecialCharacters = (str) => {
    const special_character_regex = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]|^\s*$/;
    return special_character_regex.test(str);
    return false;
}

export const Validation = {validateEmail, validateString, validatePrice, validateNumber, validateArray, containsSpecialCharacters};