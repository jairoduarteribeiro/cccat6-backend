import Cpf from '../src/Cpf';

describe('Cpf', () => {
  it('should validate a Cpf', () => {
    const cpf = new Cpf('66931474022');
    expect(cpf.value).toBe('66931474022');
  });

  it('should validate a Cpf with symbols', () => {
    const cpf = new Cpf('669.314.740-22');
    expect(cpf.value).toBe('66931474022');
  });

  it('should not validate a Cpf with invalid format', () => {
    expect(() => new Cpf('669.314.740.22')).toThrow(new Error('Invalid Cpf'));
    expect(() => new Cpf(' 669.314.740-22')).toThrow(new Error('Invalid Cpf'));
    expect(() => new Cpf('669.314.740-22 ')).toThrow(new Error('Invalid Cpf'));
  });

  it('should not validate a blocked Cpf', () => {
    expect(() => new Cpf('111.111.111-11')).toThrow(new Error('Invalid Cpf'));
  });
});
