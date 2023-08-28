const hideError = (element) => {
    element.removeClass("is-invalid");
    const error_div = element.closest("div").siblings("#invalid-feedback").length === 0
    ? element.siblings("#invalid-feedback")
    : element.closest("div").siblings("#invalid-feedback");
    error_div.text("");
};

const showError = (element, error_message) => {
    element.addClass("is-invalid");
    const error_div = element.closest("div").siblings("#invalid-feedback").length === 0
    ? element.siblings("#invalid-feedback")
    : element.closest("div").siblings("#valid-feedback");
    error_div.text(error_message);
};

export const Error = {hideError, showError};