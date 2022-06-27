import Dimension from '../../../domain/entity/Dimension';
import Item from '../../../domain/entity/Item';
import ItemRepository from '../../../domain/repository/ItemRepository';
import Connection from '../../database/Connection';

export default class ItemRepositoryDatabase implements ItemRepository {
  constructor(private readonly connection: Connection) {}

  async getById(idItem: number): Promise<Item> {
    const [itemData] = await this.connection.query('SELECT * FROM ccca.item WHERE id_item = $1', [
      idItem,
    ]);
    const item = this.parseItemData(itemData);
    return item;
  }

  async getAll(): Promise<Item[]> {
    const itemsData = await this.connection.query('SELECT * FROM ccca.item', []);
    const items: Item[] = [];
    for (const itemData of itemsData) {
      const item = this.parseItemData(itemData);
      items.push(item);
    }
    return items;
  }

  async save(item: Item): Promise<number> {
    const { idItem, description, price, weight } = item;
    const { width, height, length } = item.dimension;
    await this.connection.query(
      `
      INSERT INTO ccca.item (id_item, description, price, width, height, length, weight)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
      [idItem, description, price, width, height, length, weight]
    );
    return idItem;
  }

  async delete(idItem: number): Promise<void> {
    await this.connection.query('DELETE FROM ccca.item WHERE id_item = $1', [idItem]);
  }

  private parseItemData(itemData: any): Item {
    const idItem = itemData['id_item'];
    const description = itemData['description'];
    const price = parseFloat(itemData['price']);
    const width = itemData['width'];
    const height = itemData['height'];
    const length = itemData['length'];
    const weight = itemData['weight'];
    return new Item(idItem, description, price, new Dimension(width, height, length), weight);
  }
}
