import Coupon from '../../../domain/entity/Coupon';
import CouponRepository from '../../../domain/repository/CouponRepository';

export default class CouponRepositoryMemory implements CouponRepository {
  private coupons: Coupon[];

  constructor() {
    this.coupons = [];
  }

  async save(coupon: Coupon): Promise<string> {
    this.coupons.push(coupon);
    return coupon.couponCode;
  }

  async getByCode(code: string): Promise<Coupon> {
    const coupon = this.coupons.find((coupon) => coupon.couponCode === code);
    if (!coupon) throw new Error('Coupon not found');
    return coupon;
  }

  async delete(code: string): Promise<void> {
    this.coupons = this.coupons.filter((coupon) => coupon.couponCode !== code);
  }
}
