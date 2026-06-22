import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { Category, CreateCategory, UpdateCategory } from '../../shared/models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  categories = signal<Category[]>([]);
  loading = signal(false);

  constructor(private http: HttpClient, private api: ApiService) {}

  getActiveCategories(): Observable<Category[]> {
    this.loading.set(true);
    return this.http.get<Category[]>(`${this.api.baseUrl}/categories`).pipe(
      tap(cats => { this.categories.set(cats); this.loading.set(false); })
    );
  }

  getAllCategories(): Observable<Category[]> {
    this.loading.set(true);
    return this.http.get<Category[]>(`${this.api.baseUrl}/categories/all`).pipe(
      tap(cats => { this.categories.set(cats); this.loading.set(false); })
    );
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.api.baseUrl}/categories/${id}`);
  }

  createCategory(dto: CreateCategory): Observable<Category> {
    return this.http.post<Category>(`${this.api.baseUrl}/categories`, dto);
  }

  updateCategory(id: number, dto: UpdateCategory): Observable<Category> {
    return this.http.put<Category>(`${this.api.baseUrl}/categories/${id}`, dto);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.baseUrl}/categories/${id}`);
  }
}
