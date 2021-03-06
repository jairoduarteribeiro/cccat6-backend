import ValidateCoupon from '../../src/application/ValidateCoupon';
import Coupon from '../../src/domain/entity/Coupon';
import PgPromiseConnectionAdapter from '../../src/infra/database/PgPromiseConnectionAdapter';
import DatabaseRepositoryFactory from '../../src/infra/factory/DatabaseRepositoryFactory';

describe('ValidateCoupon', () => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  const couponRepository = repositoryFactory.createCouponRepository();

  beforeAll(async () => {
    await couponRepository.save(new Coupon('VALE20', 20, new Date('2021-12-31T23:59:59')));
  });

  it('should validate an expired coupon', async () => {
    const validateCoupon = new ValidateCoupon(repositoryFactory);
    const input = {
      code: 'VALE20',
      today: new Date('2022-01-01T00:00:00'),
    };
    const output = await validateCoupon.execute(input);
    expect(output.isExpired).toBeTruthy();
  });

  it('should validate a valid coupon', async () => {
    const validateCoupon = new ValidateCoupon(repositoryFactory);
    const input = {
      code: 'VALE20',
      today: new Date('2021-12-31T00:00:00'),
    };
    const output = await validateCoupon.execute(input);
    expect(output.isExpired).toBeFalsy();
  });

  afterAll(async () => {
    await couponRepository.delete('VALE20');
  });
});
