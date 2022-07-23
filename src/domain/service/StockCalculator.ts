import StockEntry from '../entity/StockEntry';

export default class StockCalculator {
  static calculate(stockEntries: StockEntry[]) {
    return stockEntries.reduce((total, stockEntry) => {
      return stockEntry.operation === 'in'
        ? total + stockEntry.quantity
        : total - stockEntry.quantity;
    }, 0);
  }
}
