
export interface IProductImage {
  name?: string;
}

export class ProductImage implements IProductImage {
  constructor(public name?: string) { }
}
