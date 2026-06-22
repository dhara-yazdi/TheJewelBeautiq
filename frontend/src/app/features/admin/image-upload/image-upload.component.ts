import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/product.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [RouterLink, FormsModule, LoadingSpinnerComponent],
  template: `
    <div>
      <a routerLink="/admin/products" class="text-gold hover:text-gold-light text-sm mb-4 inline-block">&larr; Back to Products</a>

      @if (loading()) {
        <app-loading-spinner />
      } @else if (product()) {
        <h1 class="text-2xl font-bold text-luxury-white mb-2">Images: {{ product()!.name }}</h1>
        <p class="text-luxury-silver mb-8">Manage product images</p>

        <!-- Upload -->
        <div class="bg-luxury-dark border border-luxury-gray rounded-lg p-6 mb-8">
          <h3 class="text-lg font-semibold text-luxury-white mb-4">Upload New Image</h3>
          <div class="flex flex-col md:flex-row gap-4 items-end">
            <div class="flex-1">
              <label class="block text-sm text-luxury-silver mb-2">Image File</label>
              <input type="file" accept="image/*" (change)="onFileSelected($event)"
                     class="input-luxury text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gold file:text-luxury-black file:font-semibold file:cursor-pointer" />
            </div>
            <div class="flex-1">
              <label class="block text-sm text-luxury-silver mb-2">Alt Text</label>
              <input type="text" [(ngModel)]="altText" class="input-luxury" placeholder="Describe the image" />
            </div>
            <label class="flex items-center gap-2 cursor-pointer pb-3">
              <input type="checkbox" [(ngModel)]="isPrimary" class="w-4 h-4 accent-gold" />
              <span class="text-luxury-silver text-sm">Primary</span>
            </label>
            <button (click)="uploadImage()" [disabled]="!selectedFile || uploading()" class="btn-gold whitespace-nowrap">
              {{ uploading() ? 'Uploading...' : 'Upload' }}
            </button>
          </div>
        </div>

        <!-- Images Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          @for (img of product()!.images; track img.id) {
            <div class="bg-luxury-dark border border-luxury-gray rounded-lg overflow-hidden"
                 [class.border-gold]="img.isPrimary">
              <div class="aspect-square bg-luxury-gray flex items-center justify-center">
                <div class="text-4xl text-gold/30">&#9830;</div>
              </div>
              <div class="p-3">
                <p class="text-luxury-white text-sm truncate">{{ img.altText }}</p>
                @if (img.isPrimary) {
                  <span class="text-gold text-xs font-semibold">Primary</span>
                }
                <button (click)="removeImage(img.id)" class="block text-red-400 hover:text-red-300 text-xs mt-2">Remove</button>
              </div>
            </div>
          } @empty {
            <div class="col-span-full text-center py-8 text-luxury-silver">No images uploaded yet.</div>
          }
        </div>
      }
    </div>
  `
})
export class ImageUploadComponent implements OnInit {
  product = signal<Product | null>(null);
  loading = signal(true);
  uploading = signal(false);
  selectedFile: File | null = null;
  altText = '';
  isPrimary = false;
  private productId = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.loadProduct();
    });
  }

  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: p => { this.product.set(p); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  uploadImage(): void {
    if (!this.selectedFile) return;
    this.uploading.set(true);
    this.productService.uploadImage(this.productId, this.selectedFile, this.altText, this.isPrimary).subscribe({
      next: () => {
        this.uploading.set(false);
        this.selectedFile = null;
        this.altText = '';
        this.isPrimary = false;
        this.loadProduct();
      },
      error: () => this.uploading.set(false)
    });
  }

  removeImage(imageId: number): void {
    if (confirm('Remove this image?')) {
      this.productService.removeImage(this.productId, imageId).subscribe(() => this.loadProduct());
    }
  }
}
