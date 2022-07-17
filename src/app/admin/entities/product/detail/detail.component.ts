import { Component, OnInit } from '@angular/core';
import { IProduct } from '../model/product.model';
import { ProductService } from '../service/product.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'product-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: IProduct | null = null;
  urlExtraImage: string[] = [];
  details: { name: string; value: string }[] = [];
  constructor(private service: ProductService) {}

  ngOnInit() {
    const id = this.product?.id;
    if (id) {
      this.service.findOne(id).subscribe({
        next: (product: HttpResponse<IProduct>) => {
          this.product = product.body ?? null;
          this.urlExtraImage = this.product?.imageDTOS?.map(
            (val) => val.name
          ) as string[];
          this.details = this.product?.detailDTOS as {
            name: string;
            value: string;
          }[];
        },
        error: () => {
          alert('server has been error');
        },
      });
    }
  }
  
}
