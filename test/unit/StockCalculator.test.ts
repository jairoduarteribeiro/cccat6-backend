import StockEntry from '../../src/domain/entity/StockEntry';
import StockCalculator from '../../src/domain/service/StockCalculator';

describe('StockCalculator', () => {
  it('should calculate the number of items in stock', () => {
    const stockEntries = [
      new StockEntry(1, 'in', 10),
      new StockEntry(1, 'in', 10),
      new StockEntry(1, 'out', 5),
      new StockEntry(1, 'out', 5),
    ];
    const total = StockCalculator.calculate(stockEntries);
    expect(total).toBe(10);
  });
});
