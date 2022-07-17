import { Component, OnInit } from '@angular/core';
import { CartService, PriceAndQuantity } from '../public-service/cart.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ICartItem } from '../model/cart';
import { AccountService } from 'src/app/core/auth/account.service';
import { AuthServerProvider } from 'src/app/core/auth/auth-jwt.service';
import { Account } from 'src/app/core/auth/account.model';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { SnackBarService } from 'src/app/shared/alert/snack-bar.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css'],
})
export class CartDetailComponent implements OnInit {
  carts?: ICartItem[];
  totalPrice = 0;
  totalQuantity = 0;
  customer!: Account | null;
  quantityOptions: (number | string)[] = [];
  isUpdate = false;
  updateFail = false;
  messageState = '';

  constructor(
    private carService: CartService,
    private accountService: AccountService,
    private snack: SnackBarService
  ) {}

  ngOnInit() {
    for (let i = 1; i <= 9; i++) {
      this.quantityOptions.push(i);
    }
    this.quantityOptions.push('10+');
    this.loadToTal();
    this.accountService.getUser().subscribe({
      next: (user) => {
        this.customer = user;
      },
    });
    this.loadCartItemSates();
  }

  loadCartItemSates(): void {
    this.carService.getCartItemSates().subscribe({
      next: (value) => {
        this.carts = value as ICartItem[];
      },
    });
  }
  private loadToTal() {
    this.carService.getTotalQuantityAndPriceSate().subscribe({
      next: (data: PriceAndQuantity | null) => {
        if (data) {
          this.totalPrice = data.totalPrice;
          this.totalQuantity = data.totalQuantity;
        }
      },
    });
  }

  loadCarts(customerId: number) {
    this.carService.findAll(customerId).subscribe({
      next: (data: HttpResponse<ICartItem[]>) => {
        this.carts = data.body ?? [];
      },
      error: () => {
        this.snack.openSnackBar('has error try again !');
      },
    });
  }
  updateQuantity(
    element: HTMLSelectElement | HTMLInputElement,
    cart: ICartItem
  ): void {


    this.updateFail = false;
    element.disabled = true;
    const value = element.value;
    if (value === '10+') {
      const qThan = element.nextElementSibling;
      qThan?.classList.remove('d-none');

      element.style.display = 'none';
      return;
    }
    if (parseInt(value) === 0) {
      this.onDelete(cart);
      return;

     }
    const quantity = parseInt(value) as number;
    const productId = cart.productId;
    const customerId = cart.customerId;
    const updateQuantity = {
      customerId: customerId,
      productId: productId,
      quantity: quantity,
    };
    this.carService.updateQuantity(updateQuantity).subscribe({
      next: () => {
        element.disabled = false;
      },
      error: (err: HttpErrorResponse) => {
        const er = err.error;
        if (err.status === 400 && er.type === 'quantity_not_available') {
          let p = element as HTMLElement;
          while (p.parentElement) {
            if (p.matches('.err-ele')) {
              break;
            }
            p = p.parentElement;
          }
          p = p.previousElementSibling as HTMLElement;
          p.classList.remove('d-none');
          this.updateFail = true;
          this.messageState = er.message;
        }
        element.disabled = false;
      },
    });
  }


  onDelete(cart: ICartItem): void {
    const productId = cart.productId;
    const customerId = this.customer?.id as number;
    this.carService.deleteOne(customerId, productId).subscribe({
      next: () => {},
    });
  }
}
