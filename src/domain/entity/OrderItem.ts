export default class OrderItem {
  readonly quantity: number;

  constructor(readonly idItem: number, readonly price: number, quantity: number) {
    if (quantity < 0) throw new Error('Invalid quantity');
    this.quantity = quantity;
  }

  getTotal() {
    return this.price * this.quantity;
  }
}
