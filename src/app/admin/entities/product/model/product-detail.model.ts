export interface IProductDetail {
  name?: string;
  value?: string;
}
export class ProductDetail implements IProductDetail {
  constructor(public name?: string, public value?: string) {}
}
