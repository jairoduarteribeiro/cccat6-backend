import CouponRepository from '../domain/repository/CouponRepository';

export default class ValidateCoupon {
  constructor(private readonly couponRepository: CouponRepository) {}

  async execute(input: ValidateCouponInput): Promise<ValidateCouponOutput> {
    const coupon = await this.couponRepository.getByCode(input.code);
    const isExpired = coupon.isExpired(input.today);
    return {
      isExpired,
    };
  }
}

type ValidateCouponInput = {
  code: string;
  today: Date;
};

type ValidateCouponOutput = {
  isExpired: boolean;
};
