import CouponRepository from '../domain/repository/CouponRepository';

export default class ValidateCoupon {
  constructor(private readonly couponRepository: CouponRepository) {}

  async execute(input: Input): Promise<Output> {
    const coupon = await this.couponRepository.getByCode(input.code);
    const isExpired = coupon.isExpired(input.today);
    return {
      isExpired,
    };
  }
}

type Input = {
  code: string;
  today: Date;
};

type Output = {
  isExpired: boolean;
};
