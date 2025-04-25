// Validación para emails
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validación para números de teléfono españoles
export const isValidSpanishPhone = (phone: string): boolean => {
  const phoneRegex = /^(?:(?:\+|00)34|0034|34)?[6789]\d{8}$/;
  return phoneRegex.test(phone);
};

// Validación para el nombre
export const isValidName = (name: string): boolean => {
  return name.length >= 2 && name.length <= 50 && /^[a-zA-ZÀ-ÿ\s'-]+$/.test(name);
};

// Validación para la dirección
export const isValidAddress = (address: string): boolean => {
  return address.length >= 5 && address.length <= 200;
};

// Sanitización de input
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Previene XSS básico
    .replace(/"/g, '"') // Reemplaza comillas dobles
    .trim();
};

// Validación para el precio
export const isValidPrice = (price: string): boolean => {
  const priceRegex = /^\d+(\.\d{1,2})?$/;
  return priceRegex.test(price);
};

// Validación para la cantidad
export const isValidQuantity = (quantity: number): boolean => {
  return Number.isInteger(quantity) && quantity > 0 && quantity <= 99;
};

// Interface para errores de validación
export interface ValidationErrors {
  [key: string]: string;
}

// Validación de formulario de contacto
export const validateContactForm = (data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!isValidName(data.name)) {
    errors.name = 'Por favor, introduce un nombre válido';
  }

  if (!isValidEmail(data.email)) {
    errors.email = 'Por favor, introduce un email válido';
  }

  if (!isValidSpanishPhone(data.phone)) {
    errors.phone = 'Por favor, introduce un número de teléfono válido';
  }

  if (!data.message || data.message.length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres';
  }

  return errors;
};

// Validación de formulario de checkout
export const validateCheckoutForm = (data: {
  name: string;
  address: string;
  phone: string;
}): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!isValidName(data.name)) {
    errors.name = 'Por favor, introduce un nombre válido';
  }

  if (!isValidAddress(data.address)) {
    errors.address = 'Por favor, introduce una dirección válida';
  }

  if (!isValidSpanishPhone(data.phone)) {
    errors.phone = 'Por favor, introduce un número de teléfono válido';
  }

  return errors;
};