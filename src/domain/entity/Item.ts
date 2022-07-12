import Dimension from './Dimension';

export default class Item {
  constructor(
    readonly idItem: number,
    readonly description: string,
    readonly price: number,
    readonly dimension = new Dimension(0, 0, 0),
    readonly weight = 0
  ) {
    if (weight < 0) throw new Error('Invalid weight');
  }

  getVolume() {
    return this.dimension.getVolume();
  }

  getDensity() {
    const volume = this.getVolume();
    return volume ? this.weight / volume : 0;
  }
}
