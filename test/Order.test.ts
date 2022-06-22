import Coupon from '../src/Coupon';
import Dimension from '../src/Dimension';
import Item from '../src/Item';
import Order from '../src/Order';

describe('Order', () => {
  it('should not create an Order with an invalid Cpf', () => {
    expect(() => new Order('669.314.740-21')).toThrow(new Error('Invalid Cpf'));
  });

  it('should create an Order with three Items', () => {
    const order = new Order('669.314.740-22');
    order.addItem(new Item(1, 'Guitarra', 1000), 1);
    order.addItem(new Item(2, 'Amplificador', 5000), 1);
    order.addItem(new Item(3, 'Cabo', 30), 3);
    const total = order.getTotal();
    expect(total).toBe(6090);
  });

  it('should calculate the Freight of an Order', () => {
    const order = new Order('669.314.740-22');
    order.addItem(new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10), 3), 1);
    order.addItem(new Item(2, 'Amplificador', 5000, new Dimension(50, 50, 50), 20), 1);
    order.addItem(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 1), 3);
    const total = order.getTotal();
    expect(total).toBe(6350);
  });

  it('should create an Order with a discount Coupon', () => {
    const order = new Order('669.314.740-22');
    order.addItem(new Item(1, 'Guitarra', 1000), 1);
    order.addItem(new Item(2, 'Amplificador', 5000), 1);
    order.addItem(new Item(3, 'Cabo', 30), 3);
    order.addCoupon(new Coupon('VALE20', 20));
    const total = order.getTotal();
    expect(total).toBe(4872);
  });

  it('should not apply an expired Coupon', () => {
    const order = new Order('669.314.740-22', new Date('2022-01-01T00:00:00'));
    order.addItem(new Item(1, 'Guitarra', 1000), 1);
    order.addItem(new Item(2, 'Amplificador', 5000), 1);
    order.addItem(new Item(3, 'Cabo', 30), 3);
    order.addCoupon(new Coupon('VALE20', 20, new Date('2021-12-31T23:59:59')));
    const total = order.getTotal();
    expect(total).toBe(6090);
  });
});
