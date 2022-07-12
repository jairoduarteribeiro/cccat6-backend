import Coupon from './Coupon';
import Cpf from './Cpf';
import Freight from './Freight';
import Item from './Item';
import OrderCode from './OrderCode';
import OrderCoupon from './OrderCoupon';
import OrderItem from './OrderItem';

export default class Order {
  private readonly cpf: Cpf;
  private readonly orderItems: OrderItem[];
  private readonly orderCode: OrderCode;
  private coupon?: OrderCoupon;
  private freight = new Freight();

  constructor(cpf: string, private readonly issueDate = new Date(), sequence = 1) {
    this.cpf = new Cpf(cpf);
    this.orderItems = [];
    this.orderCode = new OrderCode(issueDate, sequence);
  }

  addItem(item: Item, quantity: number) {
    if (this.isDuplicated(item)) throw new Error('Item was already added');
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
    this.freight.addItem(item, quantity);
  }

  private isDuplicated(item: Item) {
    return this.orderItems.some((orderItem) => orderItem.idItem === item.idItem);
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isExpired(this.issueDate)) {
      this.coupon = new OrderCoupon(coupon.couponCode, coupon.percentage);
    }
  }

  getCpf() {
    return this.cpf.value;
  }

  getCode() {
    return this.orderCode.value;
  }

  getTotal() {
    const total = this.orderItems.reduce((total, orderItem) => total + orderItem.getTotal(), 0);
    const discount = this.coupon?.calculateDiscount(total) ?? 0;
    return total - discount + this.freight.getTotal();
  }

  getFreight() {
    return this.freight.getTotal();
  }

  getIssueDate() {
    return this.issueDate;
  }

  getCouponCode(): string | undefined {
    return this.coupon?.code;
  }

  getOrderItems() {
    return [...this.orderItems];
  }
}
