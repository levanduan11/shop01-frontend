import { IProductImage } from './product-image.model';
import { IProductDetail } from './product-detail.model';
export interface IProduct {
  id?: number;
  name?: string;
  alias?: string;
  shortDescription?: string;
  fullDescription?: string;
  mainImage?: string;
  category?: string;
  brand?: string;
  enabled?: boolean;
  inStock?: boolean;
  unitsInStock?: number;
  cost?: number;
  price?: number;
  discountPercent?: number;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  imageDTOS?: IProductImage[];
  detailDTOS?: IProductDetail[];
}
export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public alias?: string,
    public shortDescription?: string,
    public fullDescription?: string,
    public mainImage?: string,
    public category?: string,
    public brand?: string,
    public enabled?: boolean,
    public inStock?: boolean,
    public unitsInStock?: number,
    public cost?: number,
    public price?: number,
    public discountPercent?: number,
    public length?: number,
    public width?: number,
    public height?: number,
    public weight?: number,
    public imageDTOS?: IProductImage[],
    public detailDTOS?: IProductDetail[]
  ) {}
}

export function getProductIdentifier(product: IProduct): number | undefined {
  return product.id;
}
