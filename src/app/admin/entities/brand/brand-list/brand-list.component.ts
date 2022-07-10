import { Component, OnInit, ViewChild } from '@angular/core';
import { BrandService } from '../service/brand.service';
import { HttpResponse } from '@angular/common/http';
import { IBrand } from '../model/brand.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { BrandDeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css'],
})
export class BrandListComponent implements OnInit {
  brands?: IBrand[];
  displayedColumns: string[] = ['id', 'name', 'logo', 'categories', 'action'];
  dataSource: MatTableDataSource<IBrand> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
    private brandService: BrandService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.findAll();
  }

  findAll(): void {
    this.brandService.findAll().subscribe({
      next: (response: HttpResponse<IBrand[]>) => {
        this.brands = response.body ?? [];
        this.dataSource = new MatTableDataSource(this.brands);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        alert('server has an error please try again!');
      },
    });
  }
  onOpenDialog(brand: IBrand): void{
    const brandRef = this.dialog.open(BrandDeleteComponent);
    brandRef.componentInstance.brand = brand;

  }
  doFilter(event: Event): void {
    const inputEle = event.target as HTMLInputElement;
    const value = inputEle.value.trim().toLowerCase();
    this.dataSource.filter = value;
    this.dataSource.filterPredicate
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
