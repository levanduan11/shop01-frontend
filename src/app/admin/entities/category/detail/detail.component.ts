import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CategoryDeleteComponent } from '../delete/delete.component';
import { ICategory } from '../model/category.model';
import { CategoryService } from '../service/category-service.service';

@Component({
  selector: 'category-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class CategoryDetailComponent implements OnInit {
  category: ICategory | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe({
      next: ({ category }) => {
        if (category) {
          this.category = category;
        }
      },
    });
  }
  onPrevious(): void {
    window.history.back();
  }
  onOpenDialog(category: ICategory | null): void {
    const dialogRef = this.dialog.open(CategoryDeleteComponent);
    dialogRef.componentInstance.category = category;
  }
}
