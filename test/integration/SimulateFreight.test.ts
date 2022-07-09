import SimulateFreight from '../../src/application/SimulateFreight';
import Dimension from '../../src/domain/entity/Dimension';
import Item from '../../src/domain/entity/Item';
import PgPromiseConnectionAdapter from '../../src/infra/database/PgPromiseConnectionAdapter';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase';

describe('SimulateFreight', () => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  const itemRepository = new ItemRepositoryDatabase(connection);

  beforeAll(async () => {
    await itemRepository.save(new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10), 3));
    await itemRepository.save(new Item(2, 'Amplificador', 5000, new Dimension(50, 50, 50), 20));
    await itemRepository.save(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 1));
  });

  it('should simulate the freight', async () => {
    const simulateFreight = new SimulateFreight(itemRepository);
    const input = {
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
    };
    const output = await simulateFreight.execute(input);
    expect(output.total).toBe(260);
  });

  afterAll(async () => {
    await itemRepository.delete(1);
    await itemRepository.delete(2);
    await itemRepository.delete(3);
  });
});
