export class LocalStorageService<T> {
  constructor(private readonly key: string) {}

  get(): T | null {
    const value = localStorage.getItem(this.key);
    if (value) {
      return JSON.parse(value) as T;
    }
    return null;
  }

  save(value: T) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  destroy() {
    localStorage.removeItem(this.key);
  }
}
