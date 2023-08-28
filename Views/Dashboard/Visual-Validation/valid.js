const hideValid = (element) => {
    element.removeClass("is-valid");
    const valid_div = element.closest("div").siblings("#valid-feedback").length === 0
    ? element.siblings("#valid-feedback")
    : element.closest("div").siblings("#valid-feedback");
    valid_div.text("");
};

const hideAllValid = (elements_array) => {
    elements_array.forEach(element => {
        hideValid(element);
    });
}

const showValid = (element, valid_message) => {
    element.addClass("is-valid");
    const valid_div = element.closest("div").siblings("#valid-feedback").length === 0
    ? element.siblings("#valid-feedback")
    : element.closest("div").siblings("#valid-feedback");
    valid_div.text(valid_message);
    setTimeout(() => {
        hideValid(element);
    }, 3000);
};

export const Valid = {hideValid, hideAllValid, showValid};