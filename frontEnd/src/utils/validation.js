/**
 * Validation utilities
 */

export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const validatePassword = (password) => password?.length >= 6;

export const validateRequired = (value) => value?.trim().length > 0;

export const validateYear = (year) => {
  const currentYear = new Date().getFullYear();
  const yearNum = parseInt(year);
  return yearNum >= 1800 && yearNum <= currentYear;
};

export const validatePhoneNumber = (phone) => /^\(\d{3}\)\s\d{3}-\d{4}$/.test(phone);

export const getFormErrors = (formData, isSignup = false) => {
  const errors = {};

  if (!validateEmail(formData.email)) {
    errors.email = formData.email ? 'Please enter a valid email' : 'Email is required';
  }

  if (!validatePassword(formData.password)) {
    errors.password = formData.password ? 'Password must be at least 6 characters' : 'Password is required';
  }

  if (isSignup) {
    if (!validateRequired(formData.name)) {
      errors.name = 'Name is required';
    }
    
    if (!validateRequired(formData.confirmPassword)) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  }

  return errors;
};