import { Component, OnInit, signal,effect } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/product.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, LoadingSpinnerComponent,  DecimalPipe],
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  product = signal<Product | null>(null);
  loading = signal(true);
  selectedImage = signal('');

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    public api: ApiService 
  ) {
    effect(() => {
    const product = this.product();

    if (
      product &&
      product.images.length > 0 &&
      !this.selectedImage()
    ) {
      this.selectedImage.set(
        this.api.imgUrl + product.images[0].imageUrl
      );
    }
  });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.productService.getProductById(id).subscribe({
        next: product => { this.product.set(product); this.loading.set(false); },
        error: () => { this.product.set(null); this.loading.set(false); }
      });
    });
  }
}
