import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { CurrencyPipe } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { BannerService } from '../../../core/services/banner.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, LoadingSpinnerComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public bannerService: BannerService,
    public productService: ProductService,
    public categoryService: CategoryService,
    public api: ApiService
  ) {}

  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe();
    this.categoryService.getActiveCategories().subscribe();
  }
}
