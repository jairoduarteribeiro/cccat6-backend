import axios from 'axios';
import PlaceOrder from '../../src/application/PlaceOrder';
import Coupon from '../../src/domain/entity/Coupon';
import Dimension from '../../src/domain/entity/Dimension';
import Item from '../../src/domain/entity/Item';
import PgPromiseConnectionAdapter from '../../src/infra/database/PgPromiseConnectionAdapter';
import DatabaseRepositoryFactory from '../../src/infra/factory/DatabaseRepositoryFactory';

describe('API', () => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  const itemRepository = repositoryFactory.createItemRepository();
  const orderRepository = repositoryFactory.createOrderRepository();
  const couponRepository = repositoryFactory.createCouponRepository();
  const placeOrder = new PlaceOrder(repositoryFactory);
  const input1 = {
    cpf: '669.314.740-22',
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    issueDate: new Date('2022-01-01T10:00:00'),
  };
  const input2 = {
    cpf: '669.314.740-22',
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    issueDate: new Date('2022-01-01T10:00:00'),
    coupon: 'VALE20',
  };
  let orderCode1: string;
  let orderCode2: string;

  beforeAll(async () => {
    await itemRepository.save(new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10), 3));
    await itemRepository.save(new Item(2, 'Amplificador', 5000, new Dimension(50, 50, 50), 20));
    await itemRepository.save(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 1));
    await couponRepository.save(new Coupon('VALE20', 20));
    const output1 = await placeOrder.execute(input1);
    const output2 = await placeOrder.execute(input2);
    orderCode1 = output1.code;
    orderCode2 = output2.code;
  });

  it('should get all items from the API', async () => {
    const response = await axios({
      url: 'http://localhost:3000/items',
      method: 'get',
    });
    const items = response.data;
    expect(items).toHaveLength(3);
  });

  it('should get all orders from the API', async () => {
    const response = await axios({
      url: 'http://localhost:3000/orders',
      method: 'get',
    });
    const orders = response.data;
    expect(orders).toHaveLength(2);
  });

  afterAll(async () => {
    await orderRepository.delete(orderCode1);
    await orderRepository.delete(orderCode2);
    await itemRepository.delete(1);
    await itemRepository.delete(2);
    await itemRepository.delete(3);
    await couponRepository.delete('VALE20');
  });
});
