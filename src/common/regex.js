/* eslint-disable prettier/prettier */
// Validators using Regular Expression

// 1. Email Validator

export const EmailValidator = value => {
  // Email Regex
  let rjx = /^[^@]+@[^@]+\.[^@\.]{2,}$/g;
  let isValid = rjx.test(value);
  if (isValid) {
    return true;
  } else {
    return false;
  }
};

// 2. Password Validator

export const PasswordValidator = value => {
  // Password Regex -> Contain 8 characters, one capital letter, one small letter, one special character
  let rjx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g;
  let isValid = rjx.test(value);
  if (isValid) {
    return true;
  } else {
    return false;
  }
};

// 3. Name Validator

export const NameValidator = value => {
  // Name Regex
  let rjx = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/gm;
  let isValid = rjx.test(value);
  if (isValid) {
    return true;
  } else {
    return false;
  }
};

// 4. Address Validator

export const AddressValidator = value => {
  // Address Regex
  let rjx = /^[0-9]+$/;
  let isValid = rjx.test(value);
  if (isValid) {
    return false;
  } else {
    return true;
  }
};

// 5. Mobile Validator

export const MobileValidator = value => {
  // Phone Regex

  let rjx = /^(((\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3}))?$/g;
  let isValid = rjx.test(value);
  if (isValid) {
    return true;
  } else {
    return false;
  }
};

// 6. Not Empty String

export const NonEmptyString = value => {
  let rjx = /^(\w+\S+)/;
  let isValid = rjx.test(value);
  if (isValid) {
    return true;
  } else {
    return false;
  }
};
