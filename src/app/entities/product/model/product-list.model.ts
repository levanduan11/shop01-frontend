
export interface IProductList {
  id?: number;
  name?: string;
  createdTime?: Date;
  updatedTime?: Date;
  enabled?: boolean;
  mainImage?: string;
  category?: string;
  brand?: string;
}

export class ProductList implements IProductList {
  constructor(
    public id?: number,
    public name?: string,
    public createdTime?: Date,
    public updatedTime?: Date,
    public enabled?: boolean,
    public mainImage?: string,
    public category?: string,
    public brand?: string
  ) { }
}
