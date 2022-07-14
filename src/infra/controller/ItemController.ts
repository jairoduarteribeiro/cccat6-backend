import GetItems from '../../application/GetItems';
import ItemRepository from '../../domain/repository/ItemRepository';
import Http from '../http/Http';

export default class ItemController {
  constructor(private readonly http: Http, private readonly itemRepository: ItemRepository) {
    http.on('get', '/items', async (params: any, body: any) => {
      const getItems = new GetItems(this.itemRepository);
      const output = await getItems.execute();
      return output;
    });
  }
}
