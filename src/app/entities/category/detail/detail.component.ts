import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from '../model/category.model';

@Component({
  selector: 'category-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class CategoryDetailComponent implements OnInit {
  category: ICategory | null=null;
  constructor(private activatedRoute:ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe({
      next: ({ category }) => {
        if (category) {
          this.category = category;
        }
      },
    });
  }
  onPrevious(): void{
    window.history.back();
  }
}
