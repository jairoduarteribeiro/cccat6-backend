import Dimension from '../../src/domain/entity/Dimension';
import Item from '../../src/domain/entity/Item';
import Connection from '../../src/infra/database/Connection';
import PgPromiseConnectionAdapter from '../../src/infra/database/PgPromiseConnectionAdapter';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase';

describe('ItemRepositoryDatabase', () => {
  const connection: Connection = PgPromiseConnectionAdapter.getInstance();
  const itemRepository = new ItemRepositoryDatabase(connection);

  it('should get an Item from database', async () => {
    const item = new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10), 3);
    await itemRepository.save(item);
    const itemFromDatabase = await itemRepository.getById(1);
    expect(itemFromDatabase).toEqual(item);
    await itemRepository.delete(1);
  });

  it('should get all Items from database', async () => {
    await itemRepository.save(new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10), 3));
    await itemRepository.save(new Item(2, 'Amplificador', 5000, new Dimension(50, 50, 50), 20));
    await itemRepository.save(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 1));
    const items = await itemRepository.getAll();
    expect(items).toHaveLength(3);
    await itemRepository.delete(1);
    await itemRepository.delete(2);
    await itemRepository.delete(3);
  });
});
