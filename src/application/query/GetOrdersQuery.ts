import Connection from '../../infra/database/Connection';

export default class GetOrdersQuery {
  constructor(private readonly connection: Connection) {}

  async execute(): Promise<Output[]> {
    const orders: Output[] = [];
    const ordersData = await this.connection.query('SELECT order_code, total FROM ccca.order', []);
    for (const orderData of ordersData) {
      const orderCode = orderData['order_code'];
      const total = parseFloat(orderData['total']);
      orders.push({ orderCode, total });
    }
    return orders;
  }
}

type Output = {
  orderCode: string;
  total: number;
};
