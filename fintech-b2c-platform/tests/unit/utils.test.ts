import { validateCPF, validateEmail, formatCurrency } from '@carteira-digital/shared-utils';

describe('Validation Utils', () => {
  describe('validateCPF', () => {
    it('deve validar um CPF correto', () => {
      expect(validateCPF('123.456.789-09')).toBe(true);
    });

    it('deve rejeitar um CPF inválido', () => {
      expect(validateCPF('000.000.000-00')).toBe(false);
      expect(validateCPF('123.456.789-10')).toBe(false);
    });

    it('deve rejeitar CPF com formato incorreto', () => {
      expect(validateCPF('abc.def.ghi-jk')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    it('deve validar um email correto', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('test.user+tag@example.co.uk')).toBe(true);
    });

    it('deve rejeitar um email inválido', () => {
      expect(validateEmail('invalid.email')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });
  });

  describe('formatCurrency', () => {
    it('deve formatar um valor em moeda', () => {
      const formatted = formatCurrency(1000.50);
      expect(formatted).toContain('1.000,50');
    });
  });
});
