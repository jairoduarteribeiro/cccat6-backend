import Item from './Item';

export default class Freight {
  private total = 0;
  private readonly DISTANCE = 1000;
  private readonly FACTOR = 100;

  addItem(item: Item, quantity: number) {
    const volume = item.getVolume();
    const density = item.getDensity();
    if (volume && density) {
      this.total += (quantity * (this.DISTANCE * volume * density)) / this.FACTOR;
    }
  }

  getTotal() {
    return this.total ? Math.max(this.total, 10) : this.total;
  }
}
