import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBrand } from '../model/brand.model';

@Component({
  selector: 'brand-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class BrandDetailComponent implements OnInit {
  brand: IBrand | null = null;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe({
      next: ({ brand }) => {
        this.brand = brand;
      },
    });
  }
  onPre(): void {
    window.history.back();
  }
}
