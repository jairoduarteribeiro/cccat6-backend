import OrderCode from '../../src/domain/entity/OrderCode';

describe('OrderCode', () => {
  it('should generate an OrderCode', () => {
    const orderCode = new OrderCode(new Date('2022-01-01T10:00:00'), 1);
    expect(orderCode.value).toBe('202200000001');
  });
});
