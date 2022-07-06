import ItemRepository from '../domain/repository/ItemRepository';
import Order from '../domain/entity/Order';
import OrderRepository from '../domain/repository/OrderRepository';

export default class PlaceOrder {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly orderRepository: OrderRepository
  ) {}

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const sequence = (await this.orderRepository.count()) + 1;
    const order = new Order(input.cpf, input.issueDate, sequence);
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getById(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
    }
    const code = await this.orderRepository.save(order);
    return {
      code,
      total: order.getTotal(),
    };
  }
}

type PlaceOrderInput = {
  cpf: string;
  orderItems: { idItem: number; quantity: number }[];
  issueDate?: Date;
};

type PlaceOrderOutput = {
  code: string;
  total: number;
};
