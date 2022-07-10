import { IProduct } from '../../admin/entities/product/model/product.model';
export interface ICartItem {
  id?: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  customerId: number;
  productId: number;
}

