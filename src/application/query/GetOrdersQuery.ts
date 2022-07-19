import OrderDAO from '../dao/OrderDAO';

export default class GetOrdersQuery {
  constructor(private readonly orderDAO: OrderDAO) {}

  async execute(): Promise<Output[]> {
    const ordersData = await this.orderDAO.getAll();
    return ordersData;
  }
}

type Output = {
  orderCode: string;
  total: number;
};
