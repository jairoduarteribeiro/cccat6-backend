import ItemRepository from '../domain/repository/ItemRepository';

export default class GetItems {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(): Promise<GetItemsOutput[]> {
    const items = await this.itemRepository.getAll();
    const output: GetItemsOutput[] = [];
    for (const { idItem, description, price } of items) {
      output.push({ idItem, description, price });
    }
    return output;
  }
}

type GetItemsOutput = {
  idItem: number;
  description: string;
  price: number;
};
