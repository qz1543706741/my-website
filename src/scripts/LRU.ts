export class LRU {
  constructor(
    public maxSize: number,
    private map = new Map(),
  ) {}

  set(key: unknown, value: unknown) {
    if (this.map.size < this.maxSize - 1) {
      this.map.set(key, value);
      return;
    }
    const [first] = this.map.keys();
    this.map.delete(first);
    this.map.set(key, value);
  }

  get(key: unknown) {
    if (this.map.has(key)) {
      const value = this.map.get(key);

      this.map.delete(key);

      this.map.set(key, value);

      return value;
    }

    return null;
  }
}
