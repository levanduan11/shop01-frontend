import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BrandService } from '../service/brand.service';
import { ActivatedRoute } from '@angular/router';
import { Brand, IBrand } from '../model/brand.model';
import { FormBuilder, Validators } from '@angular/forms';
import { timeStamp } from 'console';
import { ICategory } from '../../category/model/category.model';
import { CategoryService } from '../../category/service/category-service.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'brand-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class BrandUpdateComponent implements OnInit {
  brand: IBrand | null = null;
  action = '';
  categories?: ICategory[];
  @ViewChild('logo') logo!: ElementRef;
  isUpdate = false;
  giveUrl = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  editForm = this.fb.group({
    id: [],
    name: ['', [Validators.required]],
    categories: [],
  });
  constructor(
    private brandService: BrandService,
    private activatedRouter: ActivatedRoute,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.categoryService.listForNew().subscribe({
      next: (data: HttpResponse<ICategory[]>) => {
        this.categories = data.body ?? [];
        
      },
      error: () => {
        this.openSnackBar('server has an error please try again!');
      },
    });
    this.activatedRouter.data.subscribe({
      next: ({ brand }) => {
        this.brand = brand ?? null;
        if (this.brand) {
          if (this.brand.logo) {
            this.giveUrl = this.brand.logo;
          }
          this.isUpdate = true;
          this.action = `update brand ID: ${brand.id}`;
          this.updateForm(brand);
        } else {
          this.isUpdate = false;
          this.action = 'create brand manager';
        }
      },
      error: () => {
        this.openSnackBar('server has an error please try again!');
      },
    });
  }
  onSubmit(): void {
    const brand = this.createFromForm();
    if (this.giveUrl) {
      brand.logo = this.giveUrl;
    }
    if (brand.id) {
      this.brandService.update(brand).subscribe({
        next: () => {
          this.openSnackBar('have been updated successfully!');
          this.onPrevious();
        },
        error: (error) => {
          this.processError(error);
        },
      });
    } else {
      this.brandService.create(brand).subscribe({
        next: () => {
          this.openSnackBar('have been created successfully!');
          this.onPrevious();
        },
        error: (err: HttpErrorResponse) => {
          this.processError(err);
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
  private processError(response: HttpErrorResponse) {
    const message = response.error.message;
    if (
      message &&
      response.status === 400 &&
      response.error.type === 'BRAND_EXISTS_NAME'
    ) {
      this.openSnackBar(message);
    } else {
      this.openSnackBar('server has an error please try again!');
    }
  }

  errorHandling(control: string, error: string) {
    return this.editForm.controls[control].hasError(error);
  }
  onGiveUrl(url: string): void {
    this.giveUrl = url;
  }
  onPrevious(): void {
    window.history.back();
  }
  protected updateForm(brand: IBrand): void {
    this.editForm.patchValue({
      id: brand.id,
      name: brand.name,
      categories: brand.categories,
    });
  }
  protected createFromForm(): IBrand {
    return {
      ...new Brand(),
      id: this.editForm.get('id')?.value,
      name: this.editForm.get('name')?.value,
      categories: this.editForm.get('categories')?.value,
    };
  }
}
