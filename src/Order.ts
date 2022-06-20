import Coupon from './Coupon';
import Cpf from './Cpf';
import Item from './Item';
import OrderItem from './OrderItem';

export default class Order {
  private readonly cpf: Cpf;
  private readonly orderItems: OrderItem[];
  private coupon?: Coupon;

  constructor(cpf: string) {
    this.cpf = new Cpf(cpf);
    this.orderItems = [];
  }

  addItem(item: Item, quantity: number) {
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
  }

  addCoupon(coupon: Coupon) {
    this.coupon = coupon;
  }

  getTotal() {
    const total = this.orderItems.reduce((total, orderItem) => total + orderItem.getTotal(), 0);
    const discount = this.coupon ? (total * this.coupon.percentage) / 100 : 0;
    return total - discount;
  }
}
