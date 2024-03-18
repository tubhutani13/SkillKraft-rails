export const containsLowercase = (password) => /[a-z]/.test(password);

export const containsUppercase = (password) => /[A-Z]/.test(password);

export const containsDigit = (password) => /\d/.test(password);

export const containsSpecialCharacter = (password) =>
  /[@$!%*?&]/.test(password);

export const isLengthValid = (password) => password.length >= 8;

export const isPasswordValid = (password) => {
  return (
    containsLowercase(password) &&
    containsUppercase(password) &&
    containsDigit(password) &&
    containsSpecialCharacter(password) &&
    isLengthValid(password)
  );
};