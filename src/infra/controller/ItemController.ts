import GetItems from '../../application/GetItems';
import RepositoryFactory from '../../domain/factory/RepositoryFactory';
import Http from '../http/Http';

export default class ItemController {
  constructor(private readonly http: Http, repositoryFactory: RepositoryFactory) {
    http.on('get', '/items', async (params: any, body: any) => {
      const getItems = new GetItems(repositoryFactory);
      const output = await getItems.execute();
      return output;
    });
  }
}
