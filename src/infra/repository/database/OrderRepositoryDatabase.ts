import Order from '../../../domain/entity/Order';
import OrderRepository from '../../../domain/repository/OrderRepository';
import Connection from '../../database/Connection';

export default class OrderRepositoryDatabase implements OrderRepository {
  constructor(private readonly connection: Connection) {}

  async count(): Promise<number> {
    const [row] = await this.connection.query('SELECT COUNT(*)::INT FROM ccca.order', []);
    return row.count;
  }

  async save(order: Order): Promise<string> {
    const orderCode = order.getCode();
    await this.connection.query(
      `
      INSERT INTO ccca.order (order_code, cpf, issue_date, coupon_code, total, freight)
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [
        orderCode,
        order.getCpf(),
        order.getIssueDate(),
        order.getCouponCode(),
        order.getTotal(),
        order.getFreight(),
      ]
    );
    for (const orderItem of order.getOrderItems()) {
      await this.connection.query(
        `
        INSERT INTO ccca.order_item (order_code, id_item, price, quantity)
        VALUES ($1, $2, $3, $4)
        `,
        [orderCode, orderItem.idItem, orderItem.price, orderItem.quantity]
      );
    }
    return orderCode;
  }

  async delete(code: string): Promise<void> {
    await this.connection.query('DELETE FROM ccca.order WHERE order_code = $1', [code]);
    await this.connection.query('DELETE FROM ccca.order_item WHERE order_code = $1', [code]);
  }
}
