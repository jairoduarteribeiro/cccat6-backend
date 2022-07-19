import OrderDAO from '../dao/OrderDAO';

export default class GetOrderQuery {
  constructor(private readonly orderDAO: OrderDAO) {}

  async execute(orderCode: string): Promise<Output> {
    const orderData = await this.orderDAO.getByCode(orderCode);
    return orderData;
  }
}

type Output = {
  orderCode: string;
  total: number;
};
