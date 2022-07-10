import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICategory } from '../model/category.model';
import { CategoryService } from '../service/category-service.service';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'category-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class CategoryDeleteComponent implements OnInit {
  category: ICategory | null = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public dialog: MatDialog,
    private service: CategoryService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}
  onDelete(): void {
    const id = this.category?.id;
    if (id) {
      this.service.deleteCategory(id).subscribe({
        next: (response: HttpResponse<{}>) => {
          window.history.back();
        },
        error: (error) => {
          this.openSnackBar('server has an error please try again !')
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
