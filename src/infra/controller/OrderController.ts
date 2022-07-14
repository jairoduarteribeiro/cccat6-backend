import GetOrdersQuery from '../../application/query/GetOrdersQuery';
import Connection from '../database/Connection';
import PgPromiseConnectionAdapter from '../database/PgPromiseConnectionAdapter';
import Http from '../http/Http';

export default class OrderController {
  constructor(private readonly http: Http, private readonly connection: Connection) {
    http.on('get', '/orders', async (params: any, body: any) => {
      const getOrders = new GetOrdersQuery(this.connection);
      const output = await getOrders.execute();
      return output;
    });
  }
}
