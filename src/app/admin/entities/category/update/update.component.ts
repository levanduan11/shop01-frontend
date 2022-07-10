import { Category } from './../model/category.model';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category-service.service';
import { ICategoryForNew } from '../model/category-parent-create.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ICategory } from '../model/category.model';
import { ActivatedRoute } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'category-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class CategoryUpdateComponent implements OnInit {
  categoryForNews?: ICategoryForNew[];
  errorMessage = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isDisable = false;
  urlImage: string | null = null;
  category: ICategory | null = null;
  imageUpdate: string | null = null;
  isUpdate = false;
  actionMessage = '';
  updateCategory: ICategory | null = null;

  formEdit = this.fb.group({
    id: [],
    name: ['', [Validators.required]],
    alias: [],
    image: [],
    enabled: [true],
    parent_id: [],
  });
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe({
      next: ({ category }) => {
        if (category) {
          this.isUpdate = true;
          this.category = category;
          this.actionMessage = `Update Category Id: ${this.category?.id}`;
          this.imageUpdate = this.category?.image as string;
          this.updateForm(category);

        } else {
          this.actionMessage = `Creation Category`;
        }
      },
    });
    this.isDisable = false;
    this.categoryService.listForNew().subscribe({
      next: (list: HttpResponse<ICategoryForNew[]>) => {
        this.categoryForNews = list.body ?? [];
      },
    });
  }
  onSubmit(): void {
    const category = this.createFromForm();
    if (this.urlImage) {
      category.image = this.urlImage;
    }

    if (category.id) {
      this.categoryService.updateCategory(category).subscribe({
        next: (response: HttpResponse<ICategory>) => {
          this.openSnackBar('updated successfully');
          this.onPrevious();
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.processError(errorResponse);
        },
      });
    } else {
      this.categoryService.createCategory(category).subscribe({
        next: (response) => {
          this.openSnackBar('created successfully');
          this.onPrevious();
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.processError(errorResponse);
        },
      });
    }
  }

  onGiveUrl(url: string | null): void {
    this.isUpdate = true;
    this.urlImage = url;
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3 * 1000,
    });
  }

  protected updateForm(category: ICategory): void {
    this.formEdit.patchValue({
      id: category.id,
      name: category.name,
      alias: category.alias,
      enabled: category.enabled,
      parent_id: category.parent_id,
    });
  }
  protected createFromForm(): ICategory {
    return {
      ...new Category(),
      id: this.formEdit.get('id')?.value,
      name: this.formEdit.get('name')?.value,
      alias: this.formEdit.get('alias')?.value,
      enabled: this.formEdit.get('enabled')?.value,
      parent_id: this.formEdit.get('parent_id')?.value,
    };
  }

  errorHandling(control: string, error: string) {
    return this.formEdit.controls[control].hasError(error);
  }
  onPrevious(): void {
    window.history.back();
  }

  private processError(errorResponse: HttpErrorResponse): void {
    this.isDisable = true;
    const err = errorResponse.error.message;
    if (
      errorResponse.status === 400 &&
      errorResponse.error.type === 'CATEGORY_EXISTS_NAME'
    ) {
      this.openSnackBar(err);
    } else if (
      errorResponse.status === 400 &&
      errorResponse.error.type === 'CATEGORY_EXISTS_ALIAS'
    ) {
      this.openSnackBar(err);
    } else {
      this.openSnackBar('server has an error please try again!');
    }
  }
}
