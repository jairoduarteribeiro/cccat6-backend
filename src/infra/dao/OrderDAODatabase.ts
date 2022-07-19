import OrderDAO, { OrderData } from '../../application/dao/OrderDAO';
import Connection from '../database/Connection';

export default class OrderDAODatabase implements OrderDAO {
  constructor(private readonly connection: Connection) {}

  async getByCode(code: string): Promise<OrderData> {
    const [orderData] = await this.connection.query(
      'SELECT order_code, total FROM ccca.order WHERE order_code = $1',
      [code]
    );
    if (!orderData) throw new Error('Order not found');
    return this.parseOrderData(orderData);
  }

  async getAll(): Promise<OrderData[]> {
    const orders: OrderData[] = [];
    const ordersData = await this.connection.query('SELECT order_code, total FROM ccca.order', []);
    for (const orderData of ordersData) {
      orders.push(this.parseOrderData(orderData));
    }
    return orders;
  }

  private parseOrderData(orderData: any): OrderData {
    return {
      orderCode: orderData['order_code'],
      total: parseFloat(orderData['total']),
    };
  }
}
