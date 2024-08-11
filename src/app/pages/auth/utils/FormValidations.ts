const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateTaxNumber = (taxNumber: string) => {
    const taxNumberRegex = /^\d{11}$|^\d{14}$/; // CPF (11 digits) or CNPJ (14 digits)
    return taxNumberRegex.test(taxNumber);
};

const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10,11}$/; // Basic validation for phone numbers
    return phoneRegex.test(phone);
};

const validatePassword = (password: string) => {
    return password.length >= 6; // Minimum password length of 6 characters
};

export const FormValidatios ={
    validateEmail,
    validatePassword,
    validatePhone,
    validateTaxNumber
}