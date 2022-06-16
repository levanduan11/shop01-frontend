import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { IBrand } from '../model/brand.model';
import { BrandService } from '../service/brand.service';
import { Router } from '@angular/router';

@Component({
  selector: 'brand-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class BrandDeleteComponent implements OnInit {
  brand: IBrand | null = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private brandService: BrandService,
    private router: Router
  ) {}

  ngOnInit() {}

  onDelete(): void {
    const id = this.brand?.id;
    if (id) {
      this.brandService.delete(id).subscribe({
        next: () => {
          this.openSnackBar('have been deleted successfully !');
          window.location.reload();
        },
        error: () => {
          this.openSnackBar('server has an error please try again !');
        },
      });
    }
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3 * 1000,
    });
  }
}
