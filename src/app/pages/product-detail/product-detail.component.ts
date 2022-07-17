import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IProduct } from '../../admin/entities/product/model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/alert/snack-bar.service';
import { IProductImage } from 'src/app/admin/entities/product/model/product-image.model';
import { IProductDetail } from 'src/app/admin/entities/product/model/product-detail.model';
import { ICategoryParent } from 'src/app/admin/entities/category/model/category-parent.model';
import { PublicCategoryService } from '../public-service/public-category.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CartService } from '../public-service/cart.service';
import { Account } from '../../core/auth/account.model';
import { AccountService } from '../../core/auth/account.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductViewDetailComponent implements OnInit {
  product: IProduct | null = null;
  extraImages?: IProductImage[];
  details?: IProductDetail[];
  parents?: ICategoryParent[];
  quantityOptions: (number | string)[] = [];
  isUpdate = false;
  updateFail = false;
  messageState = '';
  currentUser: Account | null = null;
  @ViewChild('mainImg') mainImg!: ElementRef;
  constructor(
    private carService: CartService,
    private accountService: AccountService,
    private snack: SnackBarService,
    private routeSnap: ActivatedRoute,
    private publicCategory: PublicCategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.routeSnap.data.subscribe({
      next: ({ product }) => {
        this.product = product;
        if (this.product) {
          this.extraImages = this.product.imageDTOS ?? [];
          this.details = this.product.detailDTOS ?? [];
          if (this.product.category) {
            this.findAllParent(this.product.category);
          }
          for (let i = 1; i <= this.product.unitsInStock!; i++) {
            this.quantityOptions.push(i);
          }
        }
      },
      error: () => {
        this.snack.openSnackBar('has an error try again !');
      },
    });

    this.accountService.getUser().subscribe({
      next: (data) => {
        this.currentUser = data;
      },
    });
  }

  private findAllParent(alias: string): void {
    this.publicCategory.findAllParent(alias).subscribe({
      next: (data: HttpResponse<ICategoryParent[]>) => {
        this.parents = data.body ?? [];
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.snack.openSnackBar('not found category  !');
        } else {
          this.snack.openSnackBar('server has an error try again !');
        }
      },
    });
  }
  onSubCategory(event: Event, alias: string | undefined): void {
    event.preventDefault();
    if (alias) {
      this.router.navigate(['c', alias]).then(() => window.location.reload());
    }
  }
  onHover(extra: HTMLImageElement): void {
    this.mainImg.nativeElement.src = extra.src;
  }
  onOpenModal(btn: HTMLButtonElement): void {
    btn.click();
  }

  onAddToCart(
    select: HTMLSelectElement,
    input: HTMLInputElement,
    product: IProduct | null
  ): void {
    if (!this.currentUser) {
      this.router.navigate(['login']);
      return;
    }

    const value = select.value === '10+' ? input.value : select.value;
    const cartItem = {
      name: product?.name!,
      price: product?.price!,
      imageUrl: product?.mainImage!,
      quantity: parseInt(value),
      customerId: this.currentUser?.id,
      productId: product?.id!,
    };

    this.carService.addToCart(cartItem).subscribe({
      next: () => {
        this.snack.openSnackBar(`${value} item was added to cart`);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);

        const er = err.error;
        if (err.status === 400 && er.type === 'quantity_not_available') {
          const alert = document.getElementById('alert-message');
          alert?.classList.remove('d-none');
          setTimeout(() => {
            alert?.classList.add('d-none');
          }, 3000);
          this.messageState = er.message;
        }
      },
    });
  }
  onChange(select: HTMLSelectElement, input: HTMLInputElement) {
    if (select.value === '10+') {
      select.style.display = 'none';
      input.classList.remove('d-none');
    }
  }
  onBack(event: Event): void {
    event.preventDefault();
    window.history.go(-1);
  }
}
