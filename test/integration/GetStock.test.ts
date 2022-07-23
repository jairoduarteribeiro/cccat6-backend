import GetStock from '../../src/application/GetStock';
import StockEntry from '../../src/domain/entity/StockEntry';
import PgPromiseConnectionAdapter from '../../src/infra/database/PgPromiseConnectionAdapter';
import DatabaseRepositoryFactory from '../../src/infra/factory/DatabaseRepositoryFactory';

describe('GetStock', () => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  const stockRepository = repositoryFactory.createStockRepository();

  it('should get the quantity of an item in stock', async () => {
    await stockRepository.save(new StockEntry(1, 'in', 10));
    await stockRepository.save(new StockEntry(1, 'in', 10));
    await stockRepository.save(new StockEntry(1, 'out', 5));
    await stockRepository.save(new StockEntry(1, 'out', 5));
    const getStock = new GetStock(repositoryFactory);
    const output = await getStock.execute(1);
    expect(output.total).toBe(10);
    await stockRepository.delete(1);
  });
});
