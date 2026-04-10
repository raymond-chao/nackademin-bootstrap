// Form validation script
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('number');
const addressInput = document.getElementById('address');
const postalCodeInput = document.getElementById('postalCode');
const cityInput = document.getElementById('city');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        console.log('Form is valid - ready to submit');
        order();
    }
});

nameInput.addEventListener('blur', () => validateField(nameInput, validateName));
emailInput.addEventListener('blur', () => validateField(emailInput, validateEmail));
phoneInput.addEventListener('blur', () => validateField(phoneInput, validatePhone));
addressInput.addEventListener('blur', () => validateField(addressInput, validateAddress));
postalCodeInput.addEventListener('blur', () => validateField(postalCodeInput, validatePostalCode));
cityInput.addEventListener('blur', () => validateField(cityInput, validateCity));

[nameInput, emailInput, phoneInput, addressInput, postalCodeInput, cityInput].forEach(input => {
    input.addEventListener('input', function() {
        if (this.classList.contains('invalid')) {
            this.classList.remove('invalid');
            const errorTxt = this.closest('.field').querySelector('.error-txt');
            errorTxt.style.display = 'none';
        }
    });
});

function validateForm() {
    let isValid = true;
    
    if (!validateField(nameInput, validateName)) isValid = false;
    if (!validateField(emailInput, validateEmail)) isValid = false;
    if (!validateField(phoneInput, validatePhone)) isValid = false;
    if (!validateField(addressInput, validateAddress)) isValid = false;
    if (!validateField(postalCodeInput, validatePostalCode)) isValid = false;
    if (!validateField(cityInput, validateCity)) isValid = false;
    
    return isValid;
}

function validateField(input, validationFunction) {
    const field = input.closest('.field');
    const errorTxt = field.querySelector('.error-txt');
    const result = validationFunction(input.value.trim());
    
    if (!result.valid) {
        input.classList.add('invalid');
        errorTxt.textContent = result.message;
        errorTxt.style.display = 'block';
        return false;
    } else {
        input.classList.remove('invalid');
        errorTxt.style.display = 'none';
        return true;
    }
}
function validateName(value) {
    if (value === '') {
        return { valid: false, message: 'Namn kan inte vara blankt' };
    }
    if (value.length < 2) {
        return { valid: false, message: 'Namn måste vara minst 2 tecken' };
    }
    if (value.length > 50) {
        return { valid: false, message: 'Namn kan inte vara längre än 50 tecken' };
    }
    if (!/^[a-zA-ZäöåÄÖÅ\s\-]+$/.test(value)) {
        return { valid: false, message: 'Namn kan endast innehålla bokstäver' };
    }
    return { valid: true };
}

function validateEmail(value) {
    if (value === '') {
        return { valid: false, message: 'E-post kan inte vara blank' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        return { valid: false, message: 'Ange en giltig e-postadress' };
    }
    if (value.length > 50) {
        return { valid: false, message: 'E-post kan inte vara längre än 50 tecken' };
    }
    return { valid: true };
}

function validatePhone(value) {
    if (value === '') {
        return { valid: false, message: 'Telefonnummer kan inte vara blankt' };
    }
    // Remove spaces and dashes for validation
    const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
    if (!/^[0-9]+$/.test(cleanPhone)) {
        return { valid: false, message: 'Telefonnummer kan endast innehålla siffror' };
    }
    if (cleanPhone.length < 7 || cleanPhone.length > 15) {
        return { valid: false, message: 'Ange ett giltigt telefonnummer (7-15 siffror)' };
    }
    return { valid: true };
}

function validateAddress(value) {
    if (value === '') {
        return { valid: false, message: 'Gatuadress kan inte vara blank' };
    }
    if (value.length < 2) {
        return { valid: false, message: 'Gatuadress måste vara minst 2 tecken' };
    }
    if (value.length > 50) {
        return { valid: false, message: 'Gatuadress kan inte vara längre än 50 tecken' };
    }
    return { valid: true };
}

function validatePostalCode(value) {
    if (value === '') {
        return { valid: false, message: 'Postnummer kan inte vara blankt' };
    }
    // Swedish postal code format: 5 digits
    const cleanPostal = value.replace(/\s/g, '');
    if (!/^[0-9]{5}$/.test(cleanPostal)) {
        return { valid: false, message: 'Postnummer måste vara 5 siffror (t.ex. 42244)' };
    }
    return { valid: true };
}

function validateCity(value) {
    if (value === '') {
        return { valid: false, message: 'Postort kan inte vara blank' };
    }
    if (value.length < 2) {
        return { valid: false, message: 'Postort måste vara minst 2 tecken' };
    }
    if (value.length > 50) {
        return { valid: false, message: 'Postort kan inte vara längre än 50 tecken' };
    }
    if (!/^[a-zA-ZäöåÄÖÅ\s\-]+$/.test(value)) {
        return { valid: false, message: 'Postort kan endast innehålla bokstäver' };
    }
    return { valid: true };
}

function order() {
        if (!validateForm()) {
        alert('Det går inte att skicka! Vänligen fyll i alla fält korrekt.');
        return;
    }
    const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        address: addressInput.value.trim(),
        postalCode: postalCodeInput.value.trim(),
        city: cityInput.value.trim()
    };
    
    console.log('Order submitted:', formData);
    
    alert('Beställning mottagen! Tack för din order.');
    form.reset();
}
