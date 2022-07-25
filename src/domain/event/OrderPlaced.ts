import OrderItem from '../entity/OrderItem';
import DomainEvent from './DomainEvent';

export default class OrderPlaced implements DomainEvent {
  name = 'orderPlaced';

  constructor(readonly orderCode: string, readonly orderItems: OrderItem[]) {}
}
