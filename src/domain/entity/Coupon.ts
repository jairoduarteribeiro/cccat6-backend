export default class Coupon {
  constructor(
    readonly couponCode: string,
    readonly percentage: number,
    readonly expirationDate?: Date
  ) {}

  isExpired(today: Date) {
    return this.expirationDate && today.getTime() > this.expirationDate.getTime();
  }
}
