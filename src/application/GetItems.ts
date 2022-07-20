import RepositoryFactory from '../domain/factory/RepositoryFactory';
import ItemRepository from '../domain/repository/ItemRepository';

export default class GetItems {
  private readonly itemRepository: ItemRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.itemRepository = repositoryFactory.createItemRepository();
  }

  async execute(): Promise<Output[]> {
    const items = await this.itemRepository.getAll();
    const output: Output[] = [];
    for (const { idItem, description, price } of items) {
      output.push({ idItem, description, price });
    }
    return output;
  }
}

type Output = {
  idItem: number;
  description: string;
  price: number;
};
