import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { ProductListItem, CreateProduct, UpdateProduct } from '../../../shared/models/product.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [RouterLink, FormsModule, LoadingSpinnerComponent, CurrencyPipe],
  template: `
    <div>
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-luxury-white">Product Management</h1>
        <button (click)="openModal()" class="btn-gold">+ Add Product</button>
      </div>

      @if (productService.loading()) {
        <app-loading-spinner />
      } @else {
        <div class="bg-luxury-dark border border-luxury-gray rounded-lg overflow-hidden">
          <table class="w-full">
            <thead>
              <tr class="border-b border-luxury-gray">
                <th class="text-left px-6 py-4 text-gold text-sm font-semibold">Product</th>
                <th class="text-left px-6 py-4 text-gold text-sm font-semibold">Category</th>
                <th class="text-right px-6 py-4 text-gold text-sm font-semibold">Price</th>
                <th class="text-center px-6 py-4 text-gold text-sm font-semibold">Featured</th>
                <th class="text-right px-6 py-4 text-gold text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (p of productService.products(); track p.id) {
                <tr class="border-b border-luxury-gray/50 hover:bg-luxury-gray/20">
                  <td class="px-6 py-4">
                    <p class="text-luxury-white font-medium">{{ p.name }}</p>
                    <p class="text-luxury-silver text-xs">{{ p.material }}</p>
                  </td>
                  <td class="px-6 py-4 text-luxury-silver text-sm">{{ p.categoryName }}</td>
                  <td class="px-6 py-4 text-right text-gold font-semibold">{{ p.price | currency }}</td>
                  <td class="px-6 py-4 text-center">
                    <span [class]="p.isFeatured ? 'text-gold' : 'text-luxury-silver'">
                      {{ p.isFeatured ? 'Yes' : 'No' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right space-x-2">
                    <a [routerLink]="['/admin/products', p.id, 'images']" class="text-blue-400 hover:text-blue-300 text-sm">Images</a>
                    <button (click)="editProduct(p)" class="text-gold hover:text-gold-light text-sm">Edit</button>
                    <button (click)="deleteProduct(p.id)" class="text-red-400 hover:text-red-300 text-sm">Delete</button>
                  </td>
                </tr>
              } @empty {
                <tr><td colspan="5" class="px-6 py-8 text-center text-luxury-silver">No products found.</td></tr>
              }
            </tbody>
          </table>
        </div>
      }

      <!-- Modal -->
      @if (showModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 overflow-y-auto py-8">
          <div class="bg-luxury-dark border border-luxury-gray rounded-lg p-8 w-full max-w-2xl">
            <h2 class="text-xl font-bold text-luxury-white mb-6">
              {{ editingId() ? 'Edit Product' : 'Add Product' }}
            </h2>
            <form (ngSubmit)="saveProduct()" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-luxury-silver mb-2">Name</label>
                  <input type="text" [(ngModel)]="formData.name" name="name" required class="input-luxury" />
                </div>
                <div>
                  <label class="block text-sm text-luxury-silver mb-2">SKU</label>
                  <input type="text" [(ngModel)]="formData.sku" name="sku" required class="input-luxury" />
                </div>
              </div>
              <div>
                <label class="block text-sm text-luxury-silver mb-2">Description</label>
                <textarea [(ngModel)]="formData.description" name="description" rows="3" class="input-luxury resize-none"></textarea>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm text-luxury-silver mb-2">Price</label>
                  <input type="number" [(ngModel)]="formData.price" name="price" required step="0.01" class="input-luxury" />
                </div>
                <div>
                  <label class="block text-sm text-luxury-silver mb-2">Material</label>
                  <input type="text" [(ngModel)]="formData.material" name="material" class="input-luxury" />
                </div>
                <div>
                  <label class="block text-sm text-luxury-silver mb-2">Weight (g)</label>
                  <input type="number" [(ngModel)]="formData.weight" name="weight" step="0.1" class="input-luxury" />
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-luxury-silver mb-2">Category</label>
                  <select [(ngModel)]="formData.categoryId" name="categoryId" required class="input-luxury">
                    <option [ngValue]="0" disabled>Select category</option>
                    @for (cat of categoryService.categories(); track cat.id) {
                      <option [ngValue]="cat.id">{{ cat.name }}</option>
                    }
                  </select>
                </div>
                <div class="flex items-end gap-4 pb-1">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" [(ngModel)]="formData.isFeatured" name="isFeatured" class="w-4 h-4 accent-gold" />
                    <span class="text-luxury-silver text-sm">Featured</span>
                  </label>
                  @if (editingId()) {
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" [(ngModel)]="formData.isActive" name="isActive" class="w-4 h-4 accent-gold" />
                      <span class="text-luxury-silver text-sm">Active</span>
                    </label>
                  }
                </div>
              </div>
              <div class="flex gap-3 pt-4">
                <button type="submit" class="btn-gold flex-1">Save</button>
                <button type="button" (click)="closeModal()" class="btn-outline-gold flex-1">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `
})
export class ProductManagementComponent implements OnInit {
  showModal = signal(false);
  editingId = signal<number | null>(null);
  formData: CreateProduct & { isActive: boolean } = {
    name: '', description: '', price: 0, sku: '', material: '', weight: 0,
    isFeatured: false, categoryId: 0, isActive: true
  };

  constructor(
    public productService: ProductService,
    public categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts(1, 50).subscribe();
    this.categoryService.getAllCategories().subscribe();
  }

  openModal(): void {
    this.editingId.set(null);
    this.formData = { name: '', description: '', price: 0, sku: '', material: '', weight: 0, isFeatured: false, categoryId: 0, isActive: true };
    this.showModal.set(true);
  }

  editProduct(p: ProductListItem): void {
    this.editingId.set(p.id);
    this.productService.getProductById(p.id).subscribe(product => {
      this.formData = {
        name: product.name, description: product.description, price: product.price,
        sku: product.sku, material: product.material, weight: product.weight,
        isFeatured: product.isFeatured, categoryId: product.categoryId, isActive: product.isActive
      };
      this.showModal.set(true);
    });
  }

  closeModal(): void { this.showModal.set(false); }

  saveProduct(): void {
    const id = this.editingId();
    if (id) {
      const dto: UpdateProduct = { ...this.formData };
      this.productService.updateProduct(id, dto).subscribe(() => {
        this.closeModal();
        this.productService.getProducts(1, 50).subscribe();
      });
    } else {
      const { isActive, ...dto } = this.formData;
      this.productService.createProduct(dto).subscribe(() => {
        this.closeModal();
        this.productService.getProducts(1, 50).subscribe();
      });
    }
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() =>
        this.productService.getProducts(1, 50).subscribe()
      );
    }
  }
}
