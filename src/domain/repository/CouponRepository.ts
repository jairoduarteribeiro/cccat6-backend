import Coupon from '../entity/Coupon';

export default interface CouponRepository {
  save(coupon: Coupon): Promise<string>;
  getByCode(code: string): Promise<Coupon>;
  delete(code: string): Promise<void>;
}
