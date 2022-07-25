import '../config';
import ItemController from './infra/controller/ItemController';
import OrderController from './infra/controller/OrderController';
import StockController from './infra/controller/StockController';
import OrderDAODatabase from './infra/dao/OrderDAODatabase';
import PgPromiseConnectionAdapter from './infra/database/PgPromiseConnectionAdapter';
import DatabaseRepositoryFactory from './infra/factory/DatabaseRepositoryFactory';
import ExpressAdapter from './infra/http/ExpressAdapter';
import MemoryQueueAdapter from './infra/queue/MemoryQueueAdapter';

const http = new ExpressAdapter();
const queue = new MemoryQueueAdapter();

const connection = PgPromiseConnectionAdapter.getInstance();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const orderDAO = new OrderDAODatabase(connection);

new ItemController(http, repositoryFactory);
new OrderController(http, orderDAO);
new StockController(queue, repositoryFactory);

http.listen(3000);
