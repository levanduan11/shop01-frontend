import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITEMS_PER_PAGE } from 'src/app/admin/cofig/paginition.constant';
import { SnackBarService } from 'src/app/shared/alert/snack-bar.service';
import { PublicProductService } from '../public-service/public-product.service';
import { HttpResponse } from '@angular/common/http';
import { IProduct } from '../../admin/entities/product/model/product.model';
import { PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../util/request/request.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  products?: IProduct[];
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page: number=0;
  isLoading = true;
  keyword!: string;
  isNotFound = false;
  constructor(
    private publicProductService: PublicProductService,
    private activatedRoute: ActivatedRoute,
    private snack: SnackBarService,
    private router: Router
  ) {}

  ngOnInit() {
   this.keyword = this.activatedRoute.snapshot.queryParams['keyword'];
    const req = {
      page: this.page,
      size: this.itemsPerPage,
      keyword: this.keyword,
    };
    this.searchResult(req);


  }

  searchResult(req: Pagination): void {
    this.isLoading = true;
    this.publicProductService.search(req).subscribe({
      next: (data: HttpResponse<IProduct[]>) => {
        console.log(data);

        this.onSuccess(data.body);
        this.isLoading = false;
      },
      error: () => {
        this.snack.openSnackBar('server has an error try again !');
        this.isLoading = false;
      }
    });
  }

  nextPage(e:PageEvent): void{
    const req = {
      page: parseInt(e.pageIndex.toString()),
      size: parseInt(e.pageSize.toString()),
      keyword: this.keyword,
    };
    this.searchResult(req);

  }

  private onSuccess(body: any): void {
    this.products = body.content ?? [];
    if (this.products?.length===0) {
      this.isNotFound = true;
    }
    this.totalItems = body.totalElements;

  }
}
