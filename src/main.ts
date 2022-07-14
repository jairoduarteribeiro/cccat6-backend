import '../config';
import ItemController from './infra/controller/ItemController';
import PgPromiseConnectionAdapter from './infra/database/PgPromiseConnectionAdapter';
import ExpressAdapter from './infra/http/ExpressAdapter';
import ItemRepositoryDatabase from './infra/repository/database/ItemRepositoryDatabase';

const http = new ExpressAdapter();

const connection = PgPromiseConnectionAdapter.getInstance();
const itemRepository = new ItemRepositoryDatabase(connection);

new ItemController(http, itemRepository);

http.listen(3000);
