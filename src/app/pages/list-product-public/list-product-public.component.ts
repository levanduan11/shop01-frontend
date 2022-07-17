import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../admin/entities/product/model/product.model';
import { CartService } from '../public-service/cart.service';
import { Account } from '../../core/auth/account.model';
import { AccountService } from 'src/app/core/auth/account.service';
import { AuthServerProvider } from 'src/app/core/auth/auth-jwt.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { ICartItem } from '../model/cart';
import { SnackBarService } from 'src/app/shared/alert/snack-bar.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-product-public',
  templateUrl: './list-product-public.component.html',
  styleUrls: ['./list-product-public.component.css'],
})
export class ListProductPublicComponent implements OnInit {
  @Input() products?: IProduct[] = [];
  constructor(
    private cartService: CartService,
    private accountService: AccountService,
    private authProvider: AuthServerProvider,
    private router: Router,
    private loginService: LoginService,
    private snack: SnackBarService
  ) {}

  ngOnInit() {}
  addToCart(event: Event, p: IProduct): void {
    event.preventDefault();
    const token = this.authProvider.getToken();
    if (token) {
      this.accountService.fetch().subscribe({
        next: (customer: Account) => {
          this.addCart(p, customer);
        },
        error: () => {
          this.loginService.logout();
          this.router.navigate(['']).then(() => window.location.reload());
        },
      });
    } else {
      this.router.navigate(['login']);
    }
  }
  addCart(p: IProduct, customer: Account) {
    if (!p.inStock) {
      this.snack.openSnackBar(
        'this item not available please choose other item'
      );
      return;
    }
    const cart = this.createCartItem(p, customer);
    this.cartService.addToCart(cart).subscribe({
      next: () => {
        this.snack.openSnackBar('1 item have been added to your cart');
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400 && err.error.type === 'quantity_not_available') {
          this.snack.openSnackBar(err.error.message);
        } else {
          this.snack.openSnackBar('add to cart fail!');
        }
      },
    });
  }

  private createCartItem(p: IProduct, customer: Account): ICartItem {
    return {
      name: p.name!,
      price: p.price!,
      imageUrl: p.mainImage!,
      quantity: 1,
      customerId: customer.id,
      productId: p.id!,
    };
  }

}
