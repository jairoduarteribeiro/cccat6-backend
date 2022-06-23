import Item from './Item';

export default interface ItemRepository {
  getById(idItem: number): Promise<Item>;
  getAll(): Promise<Item[]>;
  save(item: Item): Promise<number>;
}
