import Dimension from '../../src/domain/entity/Dimension';

describe('Dimension', () => {
  it('should calculate the volume', () => {
    const dimension = new Dimension(100, 30, 10);
    const volume = dimension.getVolume();
    expect(volume).toBe(0.03);
  });

  it('should throw an Error if any dimension is negative', () => {
    expect(() => new Dimension(-1, 30, 10)).toThrow(new Error('Invalid dimension'));
    expect(() => new Dimension(100, -1, 10)).toThrow(new Error('Invalid dimension'));
    expect(() => new Dimension(100, 30, -1)).toThrow(new Error('Invalid dimension'));
  });
});
