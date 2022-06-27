import Coupon from './Coupon';
import Cpf from './Cpf';
import Freight from './Freight';
import Item from './Item';
import OrderCoupon from './OrderCoupon';
import OrderItem from './OrderItem';

export default class Order {
  private readonly cpf: Cpf;
  private readonly orderItems: OrderItem[];
  private coupon?: OrderCoupon;
  private freight = new Freight();

  constructor(cpf: string, private readonly issueDate = new Date()) {
    this.cpf = new Cpf(cpf);
    this.orderItems = [];
  }

  addItem(item: Item, quantity: number) {
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
    this.freight.addItem(item, quantity);
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isExpired(this.issueDate)) {
      this.coupon = new OrderCoupon(coupon.couponCode, coupon.percentage);
    }
  }

  getTotal() {
    const total = this.orderItems.reduce((total, orderItem) => total + orderItem.getTotal(), 0);
    const discount = this.coupon?.calculateDiscount(total) ?? 0;
    return total - discount + this.freight.getTotal();
  }
}
