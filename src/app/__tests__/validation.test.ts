import {
  isValidEmail,
  isValidSpanishPhone,
  isValidName,
  isValidAddress,
  sanitizeInput,
  isValidPrice,
  isValidQuantity,
  validateContactForm,
  validateCheckoutForm
} from '../utils/validation';

describe('Validation Utilities', () => {
  describe('Email Validation', () => {
    it('accepts valid emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('test.name@domain.co.uk')).toBe(true);
    });

    it('rejects invalid emails', () => {
      expect(isValidEmail('test@.com')).toBe(false);
      expect(isValidEmail('test@com')).toBe(false);
      expect(isValidEmail('test.com')).toBe(false);
    });
  });

  describe('Phone Validation', () => {
    it('accepts valid Spanish phone numbers', () => {
      expect(isValidSpanishPhone('666666666')).toBe(true);
      expect(isValidSpanishPhone('34666666666')).toBe(true);
      expect(isValidSpanishPhone('+34666666666')).toBe(true);
    });

    it('rejects invalid phone numbers', () => {
      expect(isValidSpanishPhone('1234567')).toBe(false);
      expect(isValidSpanishPhone('abc123456')).toBe(false);
      expect(isValidSpanishPhone('+1666666666')).toBe(false);
    });
  });

  describe('Name Validation', () => {
    it('accepts valid names', () => {
      expect(isValidName('John')).toBe(true);
      expect(isValidName('María José')).toBe(true);
      expect(isValidName('Jean-Pierre')).toBe(true);
    });

    it('rejects invalid names', () => {
      expect(isValidName('J')).toBe(false);
      expect(isValidName('123John')).toBe(false);
      expect(isValidName('')).toBe(false);
    });
  });

  describe('Address Validation', () => {
    it('accepts valid addresses', () => {
      expect(isValidAddress('Calle Principal 123')).toBe(true);
      expect(isValidAddress('Av. de la Constitución, 1, 2º B')).toBe(true);
    });

    it('rejects invalid addresses', () => {
      expect(isValidAddress('C/')).toBe(false);
      expect(isValidAddress('')).toBe(false);
    });
  });

  describe('Input Sanitization', () => {
    it('removes dangerous characters', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).not.toContain('<script>');
      expect(sanitizeInput('<img src="x" onerror="alert(1)">')).not.toContain('<img');
    });

    it('preserves valid characters', () => {
      expect(sanitizeInput("O'Connor")).toBe("O'Connor");
      expect(sanitizeInput('Jean-Pierre')).toBe('Jean-Pierre');
      expect(sanitizeInput('María José')).toBe('María José');
    });
  });

  describe('Price Validation', () => {
    it('accepts valid prices', () => {
      expect(isValidPrice('10.99')).toBe(true);
      expect(isValidPrice('10')).toBe(true);
      expect(isValidPrice('0.99')).toBe(true);
    });

    it('rejects invalid prices', () => {
      expect(isValidPrice('-10.99')).toBe(false);
      expect(isValidPrice('abc')).toBe(false);
      expect(isValidPrice('10.999')).toBe(false);
    });
  });

  describe('Quantity Validation', () => {
    it('accepts valid quantities', () => {
      expect(isValidQuantity(1)).toBe(true);
      expect(isValidQuantity(50)).toBe(true);
      expect(isValidQuantity(99)).toBe(true);
    });

    it('rejects invalid quantities', () => {
      expect(isValidQuantity(0)).toBe(false);
      expect(isValidQuantity(100)).toBe(false);
      expect(isValidQuantity(-1)).toBe(false);
      expect(isValidQuantity(3.5)).toBe(false);
    });
  });

  describe('Contact Form Validation', () => {
    it('returns no errors for valid data', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '666666666',
        message: 'This is a valid message'
      };
      expect(Object.keys(validateContactForm(validData)).length).toBe(0);
    });

    it('returns appropriate errors for invalid data', () => {
      const invalidData = {
        name: 'J',
        email: 'invalid-email',
        phone: '123',
        message: 'short'
      };
      const errors = validateContactForm(invalidData);
      expect(Object.keys(errors).length).toBe(4);
    });
  });

  describe('Checkout Form Validation', () => {
    it('returns no errors for valid data', () => {
      const validData = {
        name: 'John Doe',
        address: 'Calle Principal 123',
        phone: '666666666'
      };
      expect(Object.keys(validateCheckoutForm(validData)).length).toBe(0);
    });

    it('returns appropriate errors for invalid data', () => {
      const invalidData = {
        name: 'J',
        address: 'C/',
        phone: '123'
      };
      const errors = validateCheckoutForm(invalidData);
      expect(Object.keys(errors).length).toBe(3);
    });
  });
});