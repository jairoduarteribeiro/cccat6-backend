import ItemRepository from '../domain/repository/ItemRepository';

export default class GetItems {
  constructor(private readonly itemRepository: ItemRepository) {}

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
