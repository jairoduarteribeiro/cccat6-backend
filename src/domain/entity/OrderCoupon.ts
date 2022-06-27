export default class OrderCoupon {
  constructor(readonly code: string, readonly percentage: number) {}

  calculateDiscount(amount: number) {
    return (amount * this.percentage) / 100;
  }
}
