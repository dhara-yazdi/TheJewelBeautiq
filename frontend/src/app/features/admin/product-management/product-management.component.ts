import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';

import {
  ProductListItem,
  CreateProduct,
  UpdateProduct
} from '../../../shared/models/product.model';

import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    LoadingSpinnerComponent,
    CurrencyPipe
  ],
  templateUrl: './product-management.component.html'
})
export class ProductManagementComponent implements OnInit {

  showModal = signal(false);
  editingId = signal<number | null>(null);

  formData: CreateProduct & { isActive: boolean } = {
    name: '',
    description: '',
    price: 0,
    sku: '',
    material: '',
    weight: 0,
    isFeatured: false,
    categoryId: 0,
    isActive: true
  };

  constructor(
    public productService: ProductService,
    public categoryService: CategoryService
  ) { }

  ngOnInit(): void {

    this.loadProducts();

    this.categoryService.getAllCategories().subscribe();

  }

  loadProducts(page: number = this.productService.pageNumber()): void {

    this.productService.getProducts(page).subscribe();

  }

  previousPage(): void {

    if (this.productService.pageNumber() > 1) {

      this.loadProducts(
        this.productService.pageNumber() - 1
      );

    }

  }

  nextPage(): void {

    if (
      this.productService.pageNumber() <
      this.productService.totalPages()
    ) {

      this.loadProducts(
        this.productService.pageNumber() + 1
      );

    }

  }

  goToPage(page: number): void {

    if (
      page >= 1 &&
      page <= this.productService.totalPages()
    ) {

      this.loadProducts(page);

    }

  }

  pages(): number[] {

    return Array.from(
      { length: this.productService.totalPages() },
      (_, i) => i + 1
    );

  }

  openModal(): void {

    this.editingId.set(null);

    this.formData = {
      name: '',
      description: '',
      price: 0,
      sku: '',
      material: '',
      weight: 0,
      isFeatured: false,
      categoryId: 0,
      isActive: true
    };

    this.showModal.set(true);

  }

  editProduct(product: ProductListItem): void {

    this.editingId.set(product.id);

    this.productService.getProductById(product.id).subscribe(product => {

      this.formData = {
        name: product.name,
        description: product.description,
        price: product.price,
        sku: product.sku,
        material: product.material,
        weight: product.weight,
        isFeatured: product.isFeatured,
        categoryId: product.categoryId,
        isActive: product.isActive
      };

      this.showModal.set(true);

    });

  }

  closeModal(): void {

    this.showModal.set(false);

  }

  saveProduct(): void {

    const id = this.editingId();

    if (id) {

      const dto: UpdateProduct = {
        ...this.formData
      };

      this.productService.updateProduct(id, dto).subscribe(() => {

        this.closeModal();

        this.productService.refresh().subscribe();

      });

    }
    else {

      const { isActive, ...dto } = this.formData;

      this.productService.createProduct(dto).subscribe(() => {

        this.closeModal();

        this.productService.refresh().subscribe();

      });

    }

  }

  deleteProduct(id: number): void {

    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    this.productService.deleteProduct(id).subscribe(() => {

      const remainingItems =
        this.productService.products().length - 1;

      if (
        remainingItems === 0 &&
        this.productService.pageNumber() > 1
      ) {

        this.loadProducts(
          this.productService.pageNumber() - 1
        );

      }
      else {

        this.productService.refresh().subscribe();

      }

    });

  }

}