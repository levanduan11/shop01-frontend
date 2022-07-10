import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category-service.service';
import { CategoryNode } from '../model/category-node.model';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories: CategoryNode[] = [];

  treeControl = new NestedTreeControl<CategoryNode>((node) => node.child);
  dataSource = new MatTreeNestedDataSource<CategoryNode>();

  hasChild = (_: number, node: CategoryNode) =>
    !!node.child && node.child.length > 0;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.listAll();
  }

  listAll(): void {
    this.categoryService.listAll().subscribe({
      next: (data: any) => {
        this.categories = data;
        this.dataSource.data = this.categories;
      },
      error: () => {
        alert('has an error please try again !!!');
      },
    });
  }
}
