import RepositoryFactory from '../domain/factory/RepositoryFactory';
import StockRepository from '../domain/repository/StockRepository';
import StockCalculator from '../domain/service/StockCalculator';

export default class GetStock {
  private readonly stockRepository: StockRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.stockRepository = repositoryFactory.createStockRepository();
  }

  async execute(idItem: number): Promise<Output> {
    const stockEntries = await this.stockRepository.getStockEntries(idItem);
    const total = StockCalculator.calculate(stockEntries);
    return { total };
  }
}

type Output = {
  total: number;
};
