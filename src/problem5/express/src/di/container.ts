export class DIContainer {
  private dependencies: Map<string, any>;

  constructor() {
    this.dependencies = new Map();
  }

  public register(key: string, value: any): void {
    this.dependencies.set(key, value);
  }

  public resolve<T>(key: string): T {
    return this.dependencies.get(key);
  }
}
