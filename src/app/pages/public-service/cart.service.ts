import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  map,
  tap,
  mergeMap,
  shareReplay,
} from 'rxjs';
import { ICartItem } from '../model/cart';
import { AccountService } from '../../core/auth/account.service';
import { Account } from '../../core/auth/account.model';
import { IUpdateQuantity } from '../model/update-quantity';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = environment.API_LOCAL + 'client';
  private cartItemStates: BehaviorSubject<ICartItem[] | null> =
    new BehaviorSubject<ICartItem[] | null>(null);
  private totalPriceAndQuantitySate: BehaviorSubject<PriceAndQuantity | null> =
    new BehaviorSubject<PriceAndQuantity | null>(null);

  constructor(private http: HttpClient, private account: AccountService) {
    this.loadCartItems();
  }

  addToCart(cartItem: ICartItem): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/cart_item`, cartItem)
      .pipe(map(() => this.loadCartItems()));
  }

  updateQuantity(updateQuantity: IUpdateQuantity): Observable<void> {
    return this.http
      .put<void>(`${this.baseUrl}/cart_item`, updateQuantity)
      .pipe(map(() => this.loadCartItems()));
  }

  loadCartItems(): void {
    this.account.getUser().subscribe({
      next: (user: Account | null) => {
        if (user) {
          this.findAll(user.id).subscribe({
            next: (data: HttpResponse<ICartItem[]>) => {
              this.cartItemStates.next(data.body);
              this.computeTotal(data.body);
            },
          });
        }
      },
    });
  }
  private computeTotal(body: ICartItem[] | null) {
    let totalPrice = 0;
    let totalQuantity = 0;
    body?.forEach((ca) => {
      totalPrice += ca.price * ca.quantity;
      totalQuantity += ca.quantity;
    });
    this.totalPriceAndQuantitySate.next({
      totalPrice: totalPrice,
      totalQuantity: totalQuantity,
    });
  }
  getCartItemSates(): Observable<ICartItem[] | null> {
    return this.cartItemStates.asObservable();
  }
  getTotalQuantityAndPriceSate(): Observable<PriceAndQuantity | null> {
    return this.totalPriceAndQuantitySate.asObservable();
  }
  findAll(customerId: number): Observable<HttpResponse<ICartItem[]>> {
    return this.http.get<ICartItem[]>(
      `${this.baseUrl}/cart_item/${customerId}`,
      {
        observe: 'response',
      }
    );
  }

  deleteOne(customerId: number, productId: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/cart_item/${customerId}/${productId}`)
      .pipe(map(() => this.loadCartItems()));
  }
}

export interface PriceAndQuantity {
  totalPrice: number;
  totalQuantity: number;
}
