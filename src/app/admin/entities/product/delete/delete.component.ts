import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { IProduct } from '../model/product.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'product-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class ProductDeleteComponent implements OnInit {
  product: IProduct | null = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private service: ProductService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}
  onDelete(): void {
    const id = this.product?.id;
    if (id) {
      this.service.delete(id).subscribe({
        next: () => {
          this.openSnackBar('has been deleted !');
          window.location.reload();
        },
        error: () => {
          this.openSnackBar('server has an error try again !');
        },
      });
    }
  }
  private openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3 * 1000,
    });
  }
}
