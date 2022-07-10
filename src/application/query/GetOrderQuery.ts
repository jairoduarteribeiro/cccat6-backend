import Connection from '../../infra/database/Connection';

export default class GetOrderQuery {
  constructor(private readonly connection: Connection) {}

  async execute(orderCode: string): Promise<GetOrderQueryOutput> {
    const [orderData] = await this.connection.query(
      'SELECT order_code, total FROM ccca.order WHERE order_code = $1',
      [orderCode]
    );
    if (!orderData) throw new Error('Order not found');
    return {
      orderCode: orderData['order_code'],
      total: parseFloat(orderData['total']),
    };
  }
}

type GetOrderQueryOutput = {
  orderCode: string;
  total: number;
};
