import ItemRepository from '../domain/repository/ItemRepository';
import Order from '../domain/entity/Order';
import OrderRepository from '../domain/repository/OrderRepository';
import CouponRepository from '../domain/repository/CouponRepository';
import RepositoryFactory from '../domain/factory/RepositoryFactory';

export default class PlaceOrder {
  private readonly itemRepository: ItemRepository;
  private readonly orderRepository: OrderRepository;
  private readonly couponRepository: CouponRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.itemRepository = repositoryFactory.createItemRepository();
    this.orderRepository = repositoryFactory.createOrderRepository();
    this.couponRepository = repositoryFactory.createCouponRepository();
  }

  async execute(input: Input): Promise<Output> {
    const sequence = (await this.orderRepository.count()) + 1;
    const order = new Order(input.cpf, input.issueDate, sequence);
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getById(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.getByCode(input.coupon);
      order.addCoupon(coupon);
    }
    const code = await this.orderRepository.save(order);
    return {
      code,
      total: order.getTotal(),
    };
  }
}

type Input = {
  cpf: string;
  orderItems: { idItem: number; quantity: number }[];
  issueDate?: Date;
  coupon?: string;
};

type Output = {
  code: string;
  total: number;
};
