import GetStock from '../../src/application/GetStock';
import StockHandler from '../../src/application/handler/StockHandler';
import PlaceOrder from '../../src/application/PlaceOrder';
import Coupon from '../../src/domain/entity/Coupon';
import Dimension from '../../src/domain/entity/Dimension';
import Item from '../../src/domain/entity/Item';
import StockEntry from '../../src/domain/entity/StockEntry';
import OrderPlaced from '../../src/domain/event/OrderPlaced';
import StockController from '../../src/infra/controller/StockController';
import PgPromiseConnectionAdapter from '../../src/infra/database/PgPromiseConnectionAdapter';
import DatabaseRepositoryFactory from '../../src/infra/factory/DatabaseRepositoryFactory';
import MemoryQueueAdapter from '../../src/infra/queue/MemoryQueueAdapter';

describe('PlaceOrder', () => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  const itemRepository = repositoryFactory.createItemRepository();
  const orderRepository = repositoryFactory.createOrderRepository();
  const couponRepository = repositoryFactory.createCouponRepository();
  const stockRepository = repositoryFactory.createStockRepository();
  const queue = new MemoryQueueAdapter();

  beforeAll(async () => {
    await itemRepository.save(new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10), 3));
    await itemRepository.save(new Item(2, 'Amplificador', 5000, new Dimension(50, 50, 50), 20));
    await itemRepository.save(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 1));
    await couponRepository.save(new Coupon('VALE20', 20));
    await stockRepository.save(new StockEntry(1, 'in', 1));
    await stockRepository.save(new StockEntry(2, 'in', 1));
    await stockRepository.save(new StockEntry(3, 'in', 3));
  });

  it('should place an order', async () => {
    const placeOrder = new PlaceOrder(repositoryFactory, queue);
    const input = {
      cpf: '669.314.740-22',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
    };
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(6350);
    await orderRepository.delete(output.code);
  });

  it('should place an order and generate the order code', async () => {
    const placeOrder = new PlaceOrder(repositoryFactory, queue);
    const input = {
      cpf: '669.314.740-22',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      issueDate: new Date('2022-01-01T10:00:00'),
    };
    const output = await placeOrder.execute(input);
    expect(output.code).toBe('202200000001');
    await orderRepository.delete(output.code);
  });

  it('should place an order with discount', async () => {
    const placeOrder = new PlaceOrder(repositoryFactory, queue);
    const input = {
      cpf: '669.314.740-22',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      issueDate: new Date('2022-01-01T10:00:00'),
      coupon: 'VALE20',
    };
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(5132);
    await orderRepository.delete(output.code);
  });

  it('should place an order and update the stock', async () => {
    new StockController(queue, repositoryFactory);
    const placeOrder = new PlaceOrder(repositoryFactory, queue);
    const input = {
      cpf: '669.314.740-22',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
    };
    const { code } = await placeOrder.execute(input);
    const getStock = new GetStock(repositoryFactory);
    const output = await getStock.execute(3);
    expect(output.total).toBe(0);
    await orderRepository.delete(code);
  });

  afterAll(async () => {
    await itemRepository.delete(1);
    await itemRepository.delete(2);
    await itemRepository.delete(3);
    await couponRepository.delete('VALE20');
    await stockRepository.delete(1);
    await stockRepository.delete(2);
    await stockRepository.delete(3);
  });
});
