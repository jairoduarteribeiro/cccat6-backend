import Dimension from '../src/Dimension';
import Item from '../src/Item';

describe('Item', () => {
  it('should calculate the volume of an Item', () => {
    const item = new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10), 3);
    const volume = item.getVolume();
    expect(volume).toBe(0.03);
  });

  it('should calculate the density of an Item', () => {
    const item = new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10), 3);
    const density = item.getDensity();
    expect(density).toBe(100);
  });

  it('should calculate the density of an Item without Dimension and weight', () => {
    const item = new Item(1, 'Guitarra', 1000);
    const density = item.getDensity();
    expect(density).toBe(0);
  });
});
