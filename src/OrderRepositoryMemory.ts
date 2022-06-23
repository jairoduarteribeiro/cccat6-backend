import Order from './Order';
import OrderRepository from './OrderRepository';

export default class OrderRepositoryMemory implements OrderRepository {
  private orders: Order[];

  constructor() {
    this.orders = [];
  }

  async save(order: Order): Promise<void> {
    this.orders.push(order);
  }
}
