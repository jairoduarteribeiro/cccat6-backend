import Item from '../../../domain/entity/Item';
import ItemRepository from '../../../domain/repository/ItemRepository';

export default class ItemRepositoryMemory implements ItemRepository {
  private items: Item[];

  constructor() {
    this.items = [];
  }

  async getById(idItem: number): Promise<Item> {
    const item = this.items.find((item) => item.idItem === idItem);
    if (!item) throw new Error('Item not found');
    return item;
  }

  async getAll(): Promise<Item[]> {
    return [...this.items];
  }

  async save(item: Item): Promise<number> {
    this.items.push(item);
    return item.idItem;
  }

  async delete(idItem: number): Promise<void> {
    this.items = this.items.filter((item) => item.idItem !== idItem);
  }
}
