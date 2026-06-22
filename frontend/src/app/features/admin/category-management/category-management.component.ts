import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../core/services/category.service';
import { Category, CreateCategory, UpdateCategory } from '../../../shared/models/category.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [FormsModule, LoadingSpinnerComponent],
  template: `
    <div>
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-luxury-white">Category Management</h1>
        <button (click)="openModal()" class="btn-gold">+ Add Category</button>
      </div>

      @if (categoryService.loading()) {
        <app-loading-spinner />
      } @else {
        <div class="bg-luxury-dark border border-luxury-gray rounded-lg overflow-hidden">
          <table class="w-full">
            <thead>
              <tr class="border-b border-luxury-gray">
                <th class="text-left px-6 py-4 text-gold text-sm font-semibold">Name</th>
                <th class="text-left px-6 py-4 text-gold text-sm font-semibold">Description</th>
                <th class="text-center px-6 py-4 text-gold text-sm font-semibold">Products</th>
                <th class="text-center px-6 py-4 text-gold text-sm font-semibold">Status</th>
                <th class="text-right px-6 py-4 text-gold text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (cat of categoryService.categories(); track cat.id) {
                <tr class="border-b border-luxury-gray/50 hover:bg-luxury-gray/20">
                  <td class="px-6 py-4 text-luxury-white font-medium">{{ cat.name }}</td>
                  <td class="px-6 py-4 text-luxury-silver text-sm max-w-xs truncate">{{ cat.description }}</td>
                  <td class="px-6 py-4 text-center text-luxury-silver">{{ cat.productCount }}</td>
                  <td class="px-6 py-4 text-center">
                    <span [class]="cat.isActive ? 'text-green-400 text-sm' : 'text-red-400 text-sm'">
                      {{ cat.isActive ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right space-x-2">
                    <button (click)="editCategory(cat)" class="text-gold hover:text-gold-light text-sm">Edit</button>
                    <button (click)="deleteCategory(cat.id)" class="text-red-400 hover:text-red-300 text-sm">Delete</button>
                  </td>
                </tr>
              } @empty {
                <tr><td colspan="5" class="px-6 py-8 text-center text-luxury-silver">No categories found.</td></tr>
              }
            </tbody>
          </table>
        </div>
      }

      <!-- Modal -->
      @if (showModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div class="bg-luxury-dark border border-luxury-gray rounded-lg p-8 w-full max-w-lg">
            <h2 class="text-xl font-bold text-luxury-white mb-6">
              {{ editingId() ? 'Edit Category' : 'Add Category' }}
            </h2>
            <form (ngSubmit)="saveCategory()" class="space-y-4">
              <div>
                <label class="block text-sm text-luxury-silver mb-2">Name</label>
                <input type="text" [(ngModel)]="formData.name" name="name" required class="input-luxury" />
              </div>
              <div>
                <label class="block text-sm text-luxury-silver mb-2">Description</label>
                <textarea [(ngModel)]="formData.description" name="description" rows="3" class="input-luxury resize-none"></textarea>
              </div>
              <div>
                <label class="block text-sm text-luxury-silver mb-2">Image URL</label>
                <input type="text" [(ngModel)]="formData.imageUrl" name="imageUrl" class="input-luxury" />
              </div>
              @if (editingId()) {
                <div class="flex items-center gap-2">
                  <input type="checkbox" [(ngModel)]="formData.isActive" name="isActive" id="isActive"
                         class="w-4 h-4 accent-gold" />
                  <label for="isActive" class="text-luxury-silver text-sm">Active</label>
                </div>
              }
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
export class CategoryManagementComponent implements OnInit {
  showModal = signal(false);
  editingId = signal<number | null>(null);
  formData: CreateCategory & { isActive: boolean } = { name: '', description: '', imageUrl: '', isActive: true };

  constructor(public categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe();
  }

  openModal(): void {
    this.editingId.set(null);
    this.formData = { name: '', description: '', imageUrl: '', isActive: true };
    this.showModal.set(true);
  }

  editCategory(cat: Category): void {
    this.editingId.set(cat.id);
    this.formData = { name: cat.name, description: cat.description, imageUrl: cat.imageUrl, isActive: cat.isActive };
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
  }

  saveCategory(): void {
    const id = this.editingId();
    if (id) {
      const dto: UpdateCategory = { name: this.formData.name, description: this.formData.description, imageUrl: this.formData.imageUrl, isActive: this.formData.isActive };
      this.categoryService.updateCategory(id, dto).subscribe(() => {
        this.closeModal();
        this.categoryService.getAllCategories().subscribe();
      });
    } else {
      const dto: CreateCategory = { name: this.formData.name, description: this.formData.description, imageUrl: this.formData.imageUrl };
      this.categoryService.createCategory(dto).subscribe(() => {
        this.closeModal();
        this.categoryService.getAllCategories().subscribe();
      });
    }
  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe(() =>
        this.categoryService.getAllCategories().subscribe()
      );
    }
  }
}
