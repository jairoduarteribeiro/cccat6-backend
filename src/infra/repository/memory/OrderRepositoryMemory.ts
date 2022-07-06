import Order from '../../../domain/entity/Order';
import OrderRepository from '../../../domain/repository/OrderRepository';

export default class OrderRepositoryMemory implements OrderRepository {
  private orders: Order[];

  constructor() {
    this.orders = [];
  }

  async count(): Promise<number> {
    return this.orders.length;
  }

  async save(order: Order): Promise<string> {
    this.orders.push(order);
    return order.getCode();
  }

  async delete(code: string): Promise<void> {
    this.orders = this.orders.filter((order) => order.getCode() !== code);
  }
}
