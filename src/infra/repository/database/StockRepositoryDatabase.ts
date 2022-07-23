import StockEntry from '../../../domain/entity/StockEntry';
import StockRepository from '../../../domain/repository/StockRepository';
import Connection from '../../database/Connection';

export default class StockRepositoryDatabase implements StockRepository {
  constructor(private readonly connection: Connection) {}

  async save(stockEntry: StockEntry): Promise<void> {
    await this.connection.query(
      'INSERT INTO ccca.stock_entry (id_item, operation, quantity) VALUES ($1, $2, $3)',
      [stockEntry.idItem, stockEntry.operation, stockEntry.quantity]
    );
  }

  async getStockEntries(idItem: number): Promise<StockEntry[]> {
    const stockEntries: StockEntry[] = [];
    const stockEntriesData = await this.connection.query(
      'SELECT * FROM ccca.stock_entry WHERE id_item = $1',
      [idItem]
    );
    for (const stockEntryData of stockEntriesData) {
      stockEntries.push(this.parseStockEntryData(stockEntryData));
    }
    return stockEntries;
  }

  async delete(idItem: number): Promise<void> {
    await this.connection.query('DELETE FROM ccca.stock_entry WHERE id_item = $1', [idItem]);
  }

  private parseStockEntryData(stockEntryData: any) {
    const idItem = parseInt(stockEntryData['id_item']);
    const operation = stockEntryData['operation'];
    const quantity = stockEntryData['quantity'];
    return new StockEntry(idItem, operation, quantity);
  }
}
