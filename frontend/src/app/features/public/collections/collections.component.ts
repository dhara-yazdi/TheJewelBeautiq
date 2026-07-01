import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [RouterLink, FormsModule, LoadingSpinnerComponent, CurrencyPipe],
  templateUrl: './collections.component.html',
})
export class CollectionsComponent implements OnInit {
  selectedCategory = signal<number | null>(null);
  searchTerm = signal('');
  currentPage = signal(1);
  totalPages = signal(1);
  pages = signal<number[]>([]);

  constructor(
    public productService: ProductService,
    public categoryService: CategoryService,
    public api: ApiService,
    private route: ActivatedRoute
  ) {}

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
    this.productService.getProducts(
      this.currentPage(), 12, this.selectedCategory() ?? undefined, this.searchTerm() || undefined
    ).subscribe(result => {
      this.totalPages.set(result.totalPages);
      this.pages.set(Array.from({ length: result.totalPages }, (_, i) => i + 1));
    });
  }

  filterByCategory(id: number | null): void {
    this.selectedCategory.set(id);
    this.currentPage.set(1);
    this.loadProducts();
  }

  onSearch(term: string): void {
    this.searchTerm.set(term);
    this.currentPage.set(1);
    this.loadProducts();
  }

  goToPage(page: number): void {
    this.currentPage.set(page);
    this.loadProducts();
  }
}
