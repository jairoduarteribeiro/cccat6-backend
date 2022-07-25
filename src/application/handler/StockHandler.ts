import StockEntry from '../../domain/entity/StockEntry';
import OrderPlaced from '../../domain/event/OrderPlaced';
import RepositoryFactory from '../../domain/factory/RepositoryFactory';
import StockRepository from '../../domain/repository/StockRepository';

export default class StockHandler {
  private readonly stockRepository: StockRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.stockRepository = repositoryFactory.createStockRepository();
  }

  async handle(orderPlaced: OrderPlaced): Promise<void> {
    for (const orderItem of orderPlaced.orderItems) {
      await this.stockRepository.save(new StockEntry(orderItem.idItem, 'out', orderItem.quantity));
    }
  }
}
