import ItemRepository from '../domain/repository/ItemRepository';
import Order from '../domain/entity/Order';
import OrderRepository from '../domain/repository/OrderRepository';

export default class PlaceOrder {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly orderRepository: OrderRepository
  ) {}

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const order = new Order(input.cpf);
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getById(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
    }
    await this.orderRepository.save(order);
    return {
      total: order.getTotal(),
    };
  }
}

type PlaceOrderInput = {
  cpf: string;
  orderItems: { idItem: number; quantity: number }[];
};

type PlaceOrderOutput = {
  total: number;
};
