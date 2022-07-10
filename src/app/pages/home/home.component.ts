import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoryService } from '../../admin/entities/category/service/category-service.service';
import { ICategory } from '../../admin/entities/category/model/category.model';
import { ICategoryClient } from '../../admin/entities/category/model/category-client.model';
import { SnackBarService } from '../../shared/alert/snack-bar.service';
import { CategoryNode } from 'src/app/admin/entities/category/model/category-node.model';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { optionRequest } from '../../util/request/request-util';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { IProduct } from '../../admin/entities/product/model/product.model';
import { PublicProductService } from '../public-service/public-product.service';
import { PublicBrandService } from '../public-service/public-brand.service';
import { IBrand } from '../../admin/entities/brand/model/brand.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  categories: CategoryNode[] = [];
  products?: IProduct[];
  brands?: IBrand[];
  treeControl = new NestedTreeControl<CategoryNode>((node) => node.child);
  dataSource = new MatTreeNestedDataSource<CategoryNode>();
  @ViewChild('latestProducts') colLatest!: ElementRef;

  hasChild = (_: number, node: CategoryNode) =>
    !!node.child && node.child.length > 0;

  constructor(
    private categoryService: CategoryService,
    private productService: PublicProductService,
    private brandService:PublicBrandService,
    private snack: SnackBarService
  ) {}

  ngOnInit(): void {
    this.listAll();
    this.listNew();
    this.listBrandTop();
  }
  ngAfterViewInit(): void {
    const div = this.colLatest.nativeElement as HTMLDivElement;

  }
  listAll(): void {
    this.categoryService.listAllPublic().subscribe({
      next: (data: any) => {
        this.categories = data;
        this.dataSource.data = this.categories;
      },
      error: () => {
        this.snack.openSnackBar('has an error please try again !!!');
      },
    });
  }

  listNew(): void {
    this.productService.listNew().subscribe({
      next: (data: HttpResponse<IProduct[]>) => {

        this.products = data.body ?? [];
      },
      error: () => {
        this.snack.openSnackBar('has error try again !');
      }
    });
  }
  listBrandTop(): void{
    this.brandService.listForHome().subscribe({
      next: (data: HttpResponse<IBrand[]>) => {
        this.brands = data.body ?? [];
     
      },
      error: () => {
        this.snack.openSnackBar('server has error try again !');
      }
    })
  }
}
