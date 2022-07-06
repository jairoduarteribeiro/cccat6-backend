import PlaceOrder from '../../src/application/PlaceOrder';
import Dimension from '../../src/domain/entity/Dimension';
import Item from '../../src/domain/entity/Item';
import PgPromiseConnectionAdapter from '../../src/infra/database/PgPromiseConnectionAdapter';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';

describe('PlaceOrder', () => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  const itemRepository = new ItemRepositoryDatabase(connection);
  const orderRepository = new OrderRepositoryMemory();

  beforeEach(async () => {
    await itemRepository.save(new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10), 3));
    await itemRepository.save(new Item(2, 'Amplificador', 5000, new Dimension(50, 50, 50), 20));
    await itemRepository.save(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 1));
  });

  it('should place an order', async () => {
    const placeOrder = new PlaceOrder(itemRepository, orderRepository);
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
    const placeOrder = new PlaceOrder(itemRepository, orderRepository);
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

  afterEach(async () => {
    await itemRepository.delete(1);
    await itemRepository.delete(2);
    await itemRepository.delete(3);
  });
});
