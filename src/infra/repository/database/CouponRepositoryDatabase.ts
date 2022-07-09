import Coupon from '../../../domain/entity/Coupon';
import CouponRepository from '../../../domain/repository/CouponRepository';
import Connection from '../../database/Connection';

export default class CouponRepositoryDatabase implements CouponRepository {
  constructor(private readonly connection: Connection) {}

  async save({ couponCode, percentage, expirationDate }: Coupon): Promise<string> {
    await this.connection.query(
      'INSERT INTO ccca.coupon (code, percentage, expire_date) VALUES ($1, $2, $3::TIMESTAMP)',
      [couponCode, percentage, expirationDate]
    );
    return couponCode;
  }

  async getByCode(code: string): Promise<Coupon> {
    const [couponData] = await this.connection.query('SELECT * FROM ccca.coupon WHERE code = $1', [
      code,
    ]);
    if (!couponData) throw new Error('Coupon not found');
    const coupon = this.parseCouponData(couponData);
    return coupon;
  }

  async delete(code: string): Promise<void> {
    await this.connection.query('DELETE FROM ccca.coupon WHERE code = $1', [code]);
  }

  private parseCouponData(couponData: any): Coupon {
    const couponCode = couponData['code'];
    const percentage = parseInt(couponData['percentage']);
    const expirationDate = couponData['expire_date'] && new Date(couponData['expire_date']);
    return new Coupon(couponCode, percentage, expirationDate);
  }
}
