import Dimension from '../../src/domain/entity/Dimension';
import GetItems from '../../src/application/GetItems';
import Item from '../../src/domain/entity/Item';
import PgPromiseConnectionAdapter from '../../src/infra/database/PgPromiseConnectionAdapter';
import DatabaseRepositoryFactory from '../../src/infra/factory/DatabaseRepositoryFactory';

describe('GetItems', () => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  const itemRepository = repositoryFactory.createItemRepository();

  beforeAll(async () => {
    await itemRepository.save(new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10), 3));
    await itemRepository.save(new Item(2, 'Amplificador', 5000, new Dimension(50, 50, 50), 20));
    await itemRepository.save(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 1));
  });

  it('should get all items', async () => {
    const getItems = new GetItems(repositoryFactory);
    const output = await getItems.execute();
    expect(output).toHaveLength(3);
  });

  afterAll(async () => {
    await itemRepository.delete(1);
    await itemRepository.delete(2);
    await itemRepository.delete(3);
  });
});
