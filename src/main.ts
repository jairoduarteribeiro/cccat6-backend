import '../config';
import ItemController from './infra/controller/ItemController';
import OrderController from './infra/controller/OrderController';
import OrderDAODatabase from './infra/dao/OrderDAODatabase';
import PgPromiseConnectionAdapter from './infra/database/PgPromiseConnectionAdapter';
import DatabaseRepositoryFactory from './infra/factory/DatabaseRepositoryFactory';
import ExpressAdapter from './infra/http/ExpressAdapter';

const http = new ExpressAdapter();

const connection = PgPromiseConnectionAdapter.getInstance();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const orderDAO = new OrderDAODatabase(connection);

new ItemController(http, repositoryFactory);
new OrderController(http, orderDAO);

http.listen(3000);
