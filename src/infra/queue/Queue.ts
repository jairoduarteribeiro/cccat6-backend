import DomainEvent from '../../domain/event/DomainEvent';

export default interface Queue {
  consume(eventName: string, callback: any): Promise<void>;
  publish(domainEvent: DomainEvent): Promise<void>;
}
