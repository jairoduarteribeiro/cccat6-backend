import StockEntry from '../entity/StockEntry';

export default interface StockRepository {
  save(stockEntry: StockEntry): Promise<void>;
  getStockEntries(idItem: number): Promise<StockEntry[]>;
  delete(idItem: number): Promise<void>;
}
