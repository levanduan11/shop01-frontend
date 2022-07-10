import { Component, OnInit } from '@angular/core';
import { PublicResourceService } from '../public-service/public-resource.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../admin/entities/product/model/product.model';
import { SnackBarService } from '../../shared/alert/snack-bar.service';
import { Pagination } from '../../util/request/request.model';
import { ITEMS_PER_PAGE } from 'src/app/admin/cofig/paginition.constant';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { PublicCategoryService } from '../public-service/public-category.service';
import { ICategoryClient } from '../../admin/entities/category/model/category-client.model';
import { CategoryNode } from 'src/app/admin/entities/category/model/category-node.model';
import { ICategoryParent } from '../../admin/entities/category/model/category-parent.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class PublicCategoryComponent implements OnInit {
  products?: IProduct[];
  childNode?: CategoryNode[];
  category?: CategoryNode | null = null;
  parents?: ICategoryParent[];
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  isLoading = false;
  alias?: string;

  constructor(
    private publicResourceService: PublicResourceService,
    private publicCategory: PublicCategoryService,
    private activatedRoute: ActivatedRoute,
    private snack: SnackBarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe({
      next: (data) => {
        this.alias = data.get('alias') as string;
      },
    });

    if (this.alias) {
      this.loadProduct(this.alias);
      this.publicCategory.findOneAndSubCategory(this.alias).subscribe({
        next: (data: HttpResponse<CategoryNode>) => {
          this.category = data.body ?? null;
          if (this.category) {
            this.childNode = this.category.child ?? [];
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.snack.openSnackBar('not found category  !');
          } else {
            this.snack.openSnackBar('server has an error try again !');
          }
        },
      });
      this.publicCategory.findAllParent(this.alias).subscribe({
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
  }
  onSubCategory(event: Event, alias: string | undefined): void {
    event.preventDefault();
    if (alias) {
      this.router.navigate(['c', alias]).then(() => window.location.reload());
    }
  }

  loadProduct(alias: string, req?: any): void {
    this.isLoading = true;
    this.publicResourceService.listProductByCategory(alias, req).subscribe({
      next: (data: HttpResponse<IProduct[]>) => {
        this.isLoading = false;
        this.onSuccess(data.body);
      },
      error: () => {
        this.isLoading = false;
        this.snack.openSnackBar('server has an error try again !');
      },
    });
  }

  nextPage(e: PageEvent): void {
    const req = {
      page: parseInt(e.pageIndex.toString()),
      size: parseInt(e.pageSize.toString()),
    };
    if (this.alias) {
      this.loadProduct(this.alias, req);
    }
  }

  private createPagination(page: number, size: number): Pagination {
    return {
      page: page,
      size: size,
    };
  }

  private onSuccess(body: any): void {
    this.products = body.content ?? [];
    this.totalItems = body.totalElements;
  }
}
