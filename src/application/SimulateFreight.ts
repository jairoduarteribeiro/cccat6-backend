import Freight from '../domain/entity/Freight';
import ItemRepository from '../domain/repository/ItemRepository';

export default class SimulateFreight {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(input: Input): Promise<Output> {
    const freight = new Freight();
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getById(orderItem.idItem);
      freight.addItem(item, orderItem.quantity);
    }
    return {
      total: freight.getTotal(),
    };
  }
}

type Input = {
  orderItems: { idItem: number; quantity: number }[];
};

type Output = {
  total: number;
};
