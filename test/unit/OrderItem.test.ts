import OrderItem from '../../src/domain/entity/OrderItem';

describe('OrderItem', () => {
  it('should throw an Error if a negative quantity is provided', () => {
    expect(() => new OrderItem(1, 1, -2)).toThrow(new Error('Invalid quantity'));
  });
});
