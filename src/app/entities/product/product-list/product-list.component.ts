import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../service/product.service';
import { IProductList } from '../model/product-list.model';
import { HttpResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { IProduct } from '../model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductDeleteComponent } from '../delete/delete.component';
import { ProductDetailComponent } from '../detail/detail.component';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products?: IProductList[];
  displayedColumns: string[] = [
    'id',
    'mainImage',
    'name',
    'createdTime',
    'updatedTime',
    'enabled',
    'category',
    'brand',
    'action',
  ];
  dataSource: MatTableDataSource<IProductList> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
    private productService: ProductService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.listAll();
  }
  listAll(): void {
    this.productService.findAll().subscribe({
      next: (value: HttpResponse<IProductList[]>) => {
        this.products = value.body ?? [];
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        alert('server has been error please try again !');
      },
    });
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  doFilter(event: Event): void {
    const inputEle = event.target as HTMLInputElement;
    const value = inputEle.value.trim().toLowerCase();
    this.dataSource.filter = value;
    this.dataSource.filterPredicate;
  }
  onOpenDialog(product: IProduct): void {
    const productRef = this.dialog.open(ProductDeleteComponent);
    productRef.componentInstance.product = product;
  }
  onOpenDialogDetail(product: IProduct): void {
    const productRef = this.dialog.open(ProductDetailComponent);
    productRef.componentInstance.product = product;
  }
}
