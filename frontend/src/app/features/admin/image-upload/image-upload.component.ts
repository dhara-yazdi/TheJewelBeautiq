import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/product.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [RouterLink, FormsModule, LoadingSpinnerComponent],
  templateUrl: './image-upload.component.html',
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
    private productService: ProductService,
    public api: ApiService
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
