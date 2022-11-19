export class Section {
  constructor(
    { items, renderer }: { items: any[]; renderer: (item: any) => any },
    containerSelector: string,
  ) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector)!;
  }

  private _items: any[];
  private _renderer: (item: any) => any;
  private _container: HTMLElement;

  addItem(element: HTMLElement): void {
    this._container.prepend(element);
  }

  renderItems(): void {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}
