export const checkValidation = (value, rules) => {
    let isValid = false;

    if (rules.required) {
        isValid = value.trim() !== '';
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.pattern) {
        isValid = rules.pattern.test(value) && isValid;
    }

    return isValid;
}