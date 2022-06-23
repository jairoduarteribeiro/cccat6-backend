import Dimension from '../src/Dimension';
import Item from '../src/Item';
import ItemRepositoryMemory from '../src/ItemRepositoryMemory';
import OrderRepositoryMemory from '../src/OrderRepositoryMemory';
import PlaceOrder from '../src/PlaceOrder';

describe('PlaceOrder', () => {
  it('should place an order', async () => {
    const itemRepository = new ItemRepositoryMemory();
    const orderRepository = new OrderRepositoryMemory();
    const idItem1 = await itemRepository.save(
      new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10), 3)
    );
    const idItem2 = await itemRepository.save(
      new Item(2, 'Amplificador', 5000, new Dimension(50, 50, 50), 20)
    );
    const idItem3 = await itemRepository.save(
      new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 1)
    );
    const placeOrder = new PlaceOrder(itemRepository, orderRepository);
    const input = {
      cpf: '669.314.740-22',
      orderItems: [
        { idItem: idItem1, quantity: 1 },
        { idItem: idItem2, quantity: 1 },
        { idItem: idItem3, quantity: 3 },
      ],
    };
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(6350);
  });
});
