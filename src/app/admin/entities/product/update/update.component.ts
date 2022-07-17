import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { BrandService } from '../../brand/service/brand.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBrand } from '../../brand/model/brand.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IProductDetail, ProductDetail } from '../model/product-detail.model';
import { IProductImage, ProductImage } from '../model/product-image.model';
import { IProduct, Product } from '../model/product.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'product-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class ProductUpdateComponent implements OnInit {
  isLinear = false;
  overview = this.fb.group({
    id: [],
    name: ['', Validators.required],
    alias: [],
    brand: [],
    category: [],
    enabled: [false],
    inStock: [false],
    unitsInStock: [0],
    cost: [0.0, Validators.pattern('^((-)?(0|([1-9][0-9]*))(.[0-9]+)?)$')],
    price: [0.0, Validators.pattern('^((-)?(0|([1-9][0-9]*))(.[0-9]+)?)$')],
    discountPercent: [
      0.0,
      Validators.pattern('^((-)?(0|([1-9][0-9]*))(.[0-9]+)?)$'),
    ],
  });
  description = this.fb.group({
    shortDescription: [],
    fullDescription: [],
  });
  image = this.fb.group({
    mainImage: [],
    extraImage: [],
  });
  detail = this.fb.group({
    details: [],
  });
  shipping = this.fb.group({
    length: [0.0, Validators.pattern('^((-)?(0|([1-9][0-9]*))(.[0-9]+)?)$')],
    width: [0.0, Validators.pattern('^((-)?(0|([1-9][0-9]*))(.[0-9]+)?)$')],
    height: [0.0, Validators.pattern('^((-)?(0|([1-9][0-9]*))(.[0-9]+)?)$')],
    weight: [0.0, Validators.pattern('^((-)?(0|([1-9][0-9]*))(.[0-9]+)?)$')],
  });
  brands?: IBrand[];
  categories?: string[] = [];
  optionB = '';
  mainImage = '';
  extraImage = '';
  details: IProductDetail[] = [];
  images: IProductImage[] = [];
  product?: IProduct;
  action = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.action = 'Create Product';
    this.activatedRoute.data.subscribe({
      next: ({ product }) => {
        if (product) {
          this.action = 'update product ID: ' + product.id;
          this.product = product;
          this.mainImage = this.product?.mainImage as string;
          this.updateForm(product);
          this.details = this.detail.get('details')?.value as IProductDetail[];
          this.images = this.image.get('extraImage')?.value as IProductImage[];
          this.categories?.push(product.category);
        }
      },
      error: () => {
        alert('server has been an error');
      },
    });
    this.brandService.findAll().subscribe({
      next: (value: HttpResponse<IBrand[]>) => {
        this.brands = value.body ?? [];
      },
    });
  }
  ngAfterViewInit(): void {
    this.generateExtraAndDetail();
  }
  onSubmit(): void {
    const id = this.product?.id;
    const product = this.createFromForm();
    if (id) {
      this.productService.update(product).subscribe({
        next: () => {
          this.openSnackBar('have been updated successfully!');
          this.onPrevious();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.handleErrResponse(err);
        },
      });
    } else {
      this.productService.create(product).subscribe({
        next: () => {
          this.openSnackBar('have been created successfully!');
          this.onPrevious();
        },
        error: (err: HttpErrorResponse) => {
          this.handleErrResponse(err);
        },
      });
    }
  }

  private handleErrResponse(err: HttpErrorResponse) {
    let alertMessage = '';
    if (
      err.status === 400 &&
      (err.error.type === 'PRODUCT_EXISTS_NAME' ||
        err.error.type === 'PRODUCT_EXISTS_ALIAS')
    ) {
      alertMessage = err.error.message;
    } else {
      alertMessage = 'update fail please try again';
    }
    this.openSnackBar(alertMessage);
  }

  private createFromForm(): IProduct {
    return {
      ...new Product(),
      id: this.overview.get('id')?.value,
      name: this.overview.get('name')?.value,
      alias: this.overview.get('alias')?.value,
      shortDescription: this.description.get('shortDescription')?.value,
      fullDescription: this.description.get('fullDescription')?.value,
      mainImage: this.image.get('mainImage')?.value,
      category: this.overview.get('category')?.value,
      brand: this.overview.get('brand')?.value,
      enabled: this.overview.get('enabled')?.value,
      inStock: this.overview.get('inStock')?.value,
      unitsInStock: this.overview.get('unitsInStock')?.value,
      cost: this.overview.get('cost')?.value,
      price: this.overview.get('price')?.value,
      discountPercent: this.overview.get('discountPercent')?.value,
      length: this.shipping.get('length')?.value,
      width: this.shipping.get('width')?.value,
      height: this.shipping.get('height')?.value,
      weight: this.shipping.get('weight')?.value,
      imageDTOS: this.image.get('extraImage')?.value,
      detailDTOS: this.detail.get('details')?.value,
    };
  }

  private updateForm(product: IProduct): void {
    this.overview.patchValue({
      id: product.id,
      name: product.name,
      alias: product.alias,
      brand: product.brand,
      category: product.category,
      enabled: product.enabled,
      inStock: product.inStock,
      unitsInStock:product.unitsInStock,
      cost: product.cost,
      price: product.price,
      discountPercent: product.discountPercent,
    });

    this.description.patchValue({
      shortDescription: product.shortDescription,
      fullDescription: product.fullDescription,
    });

    this.image.patchValue({
      mainImage: product.mainImage,
      extraImage: product.imageDTOS,
    });
    this.detail.patchValue({
      details: product.detailDTOS,
    });

    this.shipping.patchValue({
      length: product.length,
      width: product.width,
      height: product.height,
      weight: product.weight,
    });
  }
  private generateExtraAndDetail(): void {
    this.images.forEach((val) => {
      this.createExtraImageElement(val);
    });
    this.details.forEach((detail) => {
      this.createDetailElement(detail);
    });
  }

  private createDetailElement(detail: IProductDetail) {
    const detailEle = document.getElementById('detail');
    const firstDetail = document.getElementById('first-detail') as HTMLElement;

    const formRow = document.createElement('div');
    formRow.classList.add('form-row');
    formRow.style.marginBottom = '10px';

    detailEle?.insertBefore(formRow, firstDetail);
    const col1 = document.createElement('div');
    col1.classList.add('col');
    formRow.appendChild(col1);
    const input1 = document.createElement('input');
    input1.classList.add('form-control');
    if (detail.name) {
      input1.value = detail.name;
    }

    input1.setAttribute('readonly', 'readonly');
    col1.appendChild(input1);

    const col2 = document.createElement('div');
    col2.classList.add('col');
    formRow.appendChild(col2);
    const input2 = document.createElement('input');
    input2.classList.add('form-control');
    if (detail.value) {
      input2.value = detail.value;
    }

    input2.setAttribute('readonly', 'readonly');
    col2.appendChild(input2);

    const removeD = document.createElement('a');
    removeD.classList.add('badge', 'badge-dark');
    removeD.innerHTML = 'remove';
    removeD.style.width = '55px';
    removeD.style.height = '20px';
    removeD.style.cursor = 'pointer';
    formRow.appendChild(removeD);

    removeD.addEventListener('click', (e) => {
      e.preventDefault();
      for (let i = 0; i < this.details.length; i++) {
        if (this.details[i].name === detail.name) {
          this.details.splice(i, 1);
          break;
        }
      }
      this.detail.patchValue({
        details: this.details,
      });
      formRow.remove();
    });
  }

  private createExtraImageElement(val: IProductImage) {
    const divCol = document.createElement('div');
    divCol.classList.add('col-md-3');

    const card = document.createElement('div');
    card.classList.add('card');

    divCol.appendChild(card);
    const img = document.createElement('img');
    img.classList.add('card-img-top');
    if (val.name) {
      img.src = val.name;
    }

    card.appendChild(img);

    const carBody = document.createElement('div');
    carBody.classList.add('card-body');
    card.appendChild(carBody);

    const label = document.createElement('p');
    label.innerText = 'Extra image';
    carBody.appendChild(label);

    const btnDelete = document.createElement('a');
    btnDelete.classList.add('badge', 'badge-danger');
    btnDelete.innerText = 'delete';
    btnDelete.style.cursor = 'pointer';
    btnDelete.setAttribute('title', 'delete this');
    carBody.appendChild(btnDelete);

    const row = document.getElementById('row') as HTMLElement;
    const extraElement = document.getElementById('extra-image') as HTMLElement;

    row.insertBefore(divCol, extraElement);
    btnDelete.addEventListener('click', (e) => {
      e.preventDefault();
      let t = e.target as HTMLElement;
      let v = e.target as HTMLElement;
      const parentSelector = '.col-md-3';
      let parent: HTMLElement | null = null;

      while (t.parentElement) {
        if (t.parentElement.matches(parentSelector)) {
          parent = t.parentElement;
          break;
        }
        t = t.parentElement;
      }
      if (parent) {
        const imgElement = v.parentElement?.previousElementSibling;
        const imgURL = imgElement?.getAttribute('src');
        for (let i = 0; i < this.images.length; i++) {
          if (this.images[i].name === imgURL) {
            this.images.splice(i, 1);
            break;
          }
        }
        this.image.patchValue({
          extraImage: this.images,
        });
        parent.remove();
      }
    });
  }

  onAddDetail(name: HTMLInputElement, value: HTMLInputElement): void {
    const nameValue = name.value;
    const valueV = value.value;
    if (nameValue.trim() && valueV.trim()) {
      const detail = new ProductDetail(nameValue, valueV);
      this.details.push(detail);
      this.detail.patchValue({
        details: this.details,
      });

      this.createDetailElement(detail);
      name.value = '';
      value.value = '';
      name.focus();
    } else {
      this.openSnackBar('please enter name and value');
    }
  }

  getMainImageUrl(mainImage: string) {
    this.mainImage = mainImage;
    this.image.patchValue({
      mainImage: mainImage,
    });
  }

  getExtraImageUrl(extraImage: string) {
    const im = new ProductImage(extraImage);
    this.images.push(im);
    this.image.patchValue({
      extraImage: this.images,
    });

    this.createExtraImageElement(im);
  }

  onChange(value: string) {
    this.brandService.listCategory(value).subscribe({
      next: (value) => {
        this.categories = value ?? [];
        this.overview.get('category')?.setValue(this.categories![0]);
      },
    });
  }

  errorHandlingOverview(control: string, error: string, type: FormGroup) {
    return type.controls[control].hasError(error);
  }
  onPrevious(): void {
    window.history.back();
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3 * 1000,
    });
  }
}
