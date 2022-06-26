import Dimension from '../src/Dimension';
import Item from '../src/Item';
import ItemRepositoryMemory from '../src/ItemRepositoryMemory';
import OrderRepositoryMemory from '../src/OrderRepositoryMemory';
import PlaceOrder from '../src/PlaceOrder';

describe('PlaceOrder', () => {
  const itemRepository = new ItemRepositoryMemory();
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
  });

  afterEach(async () => {
    await itemRepository.delete(1);
    await itemRepository.delete(2);
    await itemRepository.delete(3);
  });
});
