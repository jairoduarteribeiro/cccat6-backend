import Cpf from '../src/Cpf';

describe('Cpf', () => {
  it('should validate a Cpf', () => {
    const cpf = new Cpf('66931474022');
    expect(cpf.value).toBe('66931474022');
  });
});
