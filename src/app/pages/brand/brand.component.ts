import { Component, OnInit } from '@angular/core';
import { ITEMS_PER_PAGE } from 'src/app/admin/cofig/paginition.constant';
import { Pagination } from '../../util/request/request.model';
import { PublicProductService } from '../public-service/public-product.service';
import { IProduct } from '../../admin/entities/product/model/product.model';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SnackBarService } from '../../shared/alert/snack-bar.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class PublicBrandComponent implements OnInit {
  products?: IProduct[];
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  isLoading = false;
  id!: number;

  constructor(
    private productService: PublicProductService,
    private activatedRoute: ActivatedRoute,
    private snack: SnackBarService
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.id = id;
      this.loadProduct(id);
    }
  }

  loadProduct(id: number, req?: Pagination): void {
    this.productService.listByBrand(id, req).subscribe({
      next: (data: HttpResponse<IProduct[]>) => {
        this.onSuccess(data.body);
        console.log(data);
      },
      error: () => {
        this.snack.openSnackBar('server has an error try again !');
      },
    });
  }

  nextPage(e: PageEvent): void {
    const req = {
      page: e.pageIndex,
      size: e.pageSize,
    };
    this.loadProduct(this.id, req);
  }

  private onSuccess(body: any): void {
    this.totalItems = body.totalElements;
    this.products = body.content ?? [];
  }
 
}
