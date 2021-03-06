import Cpf from '../../src/domain/entity/Cpf';

describe('Cpf', () => {
  it('should validate a Cpf', () => {
    const cpf = new Cpf('66931474022');
    expect(cpf.value).toBe('66931474022');
  });

  it('should validate a Cpf with symbols', () => {
    const cpf = new Cpf('669.314.740-22');
    expect(cpf.value).toBe('66931474022');
  });

  it('should validate a Cpf with some check digit equal to zero', () => {
    const cpf = new Cpf('480.145.780-07');
    expect(cpf.value).toBe('48014578007');
  });

  it('should not validate a Cpf with invalid format', () => {
    expect(() => new Cpf('669.314.740.22')).toThrow(new Error('Invalid Cpf'));
    expect(() => new Cpf(' 669.314.740-22')).toThrow(new Error('Invalid Cpf'));
    expect(() => new Cpf('669.314.740-22 ')).toThrow(new Error('Invalid Cpf'));
  });

  it('should not validate a blocked Cpf', () => {
    expect(() => new Cpf('111.111.111-11')).toThrow(new Error('Invalid Cpf'));
  });

  it('should not validate a Cpf with wrong check digits', () => {
    expect(() => new Cpf('669.314.740-21')).toThrow(new Error('Invalid Cpf'));
  });
});
