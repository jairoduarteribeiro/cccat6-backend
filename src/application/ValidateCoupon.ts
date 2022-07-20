import RepositoryFactory from '../domain/factory/RepositoryFactory';
import CouponRepository from '../domain/repository/CouponRepository';

export default class ValidateCoupon {
  private readonly couponRepository: CouponRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.couponRepository = repositoryFactory.createCouponRepository();
  }

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
