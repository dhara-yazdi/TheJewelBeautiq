import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [
    RouterLink,
    LoadingSpinnerComponent
  ],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export class CollectionsComponent implements OnInit {

  selectedCategory = signal<number | null>(null);

  constructor(
    public productService: ProductService,
    public categoryService: CategoryService,
    public api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.categoryService.getActiveCategories().subscribe();

    this.route.queryParams.subscribe(params => {

      if (params['category']) {
        this.selectedCategory.set(+params['category']);
      }

      this.loadProducts();

    });

  }

  loadProducts(): void {

    this.productService
      .getProducts(
        1,
        100,
        this.selectedCategory() ?? undefined
      )
      .subscribe();

  }

  filterByCategory(categoryId: number | null): void {

    this.selectedCategory.set(categoryId);

    this.loadProducts();

  }

}