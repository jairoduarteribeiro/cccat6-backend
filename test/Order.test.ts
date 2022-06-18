import Order from '../src/Order';

describe('Order', () => {
  it('should not create an Order with an invalid Cpf', () => {
    expect(() => new Order('669.314.740-21')).toThrow(new Error('Invalid Cpf'));
  });
});
