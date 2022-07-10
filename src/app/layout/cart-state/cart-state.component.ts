import { Component, OnInit } from '@angular/core';
import { CartService, PriceAndQuantity } from 'src/app/pages/public-service/cart.service';

@Component({
  selector: 'cart-state',
  templateUrl: './cart-state.component.html',
  styleUrls: ['./cart-state.component.css'],
})
export class CartStateComponent implements OnInit {
  totalQuantity = 0;

  constructor(private cartSate: CartService) {}

  ngOnInit(): void {
    this.cartSate.getTotalQuantityAndPriceSate().subscribe({
      next: (value: (PriceAndQuantity | null))=>{
        if (value) {
          this.totalQuantity = value.totalQuantity;
        }
     }
    })
  }
}
