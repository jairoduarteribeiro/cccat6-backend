import OrderDAO from '../../application/dao/OrderDAO';
import GetOrdersQuery from '../../application/query/GetOrdersQuery';
import Http from '../http/Http';

export default class OrderController {
  constructor(private readonly http: Http, private readonly orderDAO: OrderDAO) {
    http.on('get', '/orders', async (params: any, body: any) => {
      const getOrders = new GetOrdersQuery(this.orderDAO);
      const output = await getOrders.execute();
      return output;
    });
  }
}
