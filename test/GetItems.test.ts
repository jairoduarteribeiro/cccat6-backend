import Dimension from '../src/Dimension';
import GetItems from '../src/GetItems';
import Item from '../src/Item';
import ItemRepositoryMemory from '../src/ItemRepositoryMemory';

describe('GetItems', () => {
  it('should get all items', async () => {
    const itemRepository = new ItemRepositoryMemory();
    await itemRepository.save(new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10), 3));
    await itemRepository.save(new Item(2, 'Amplificador', 5000, new Dimension(50, 50, 50), 20));
    await itemRepository.save(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 1));
    const getItems = new GetItems(itemRepository);
    const output = await getItems.execute();
    expect(output).toHaveLength(3);
  });
});
