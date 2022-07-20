import Freight from '../domain/entity/Freight';
import RepositoryFactory from '../domain/factory/RepositoryFactory';
import ItemRepository from '../domain/repository/ItemRepository';

export default class SimulateFreight {
  private readonly itemRepository: ItemRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.itemRepository = repositoryFactory.createItemRepository();
  }

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
