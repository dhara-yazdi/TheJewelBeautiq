import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import {
  Product,
  ProductListItem,
  CreateProduct,
  UpdateProduct,
  PagedResult
} from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products = signal<ProductListItem[]>([]);
  featuredProducts = signal<ProductListItem[]>([]);

  loading = signal(false);

  totalCount = signal(0);
  totalPages = signal(0);

  pageNumber = signal(1);
  pageSize = signal(10);

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) { }

  getProducts(
    page: number = this.pageNumber(),
    pageSize: number = this.pageSize(),
    categoryId?: number,
    search?: string
  ): Observable<PagedResult<ProductListItem>> {

    let url = `${this.api.baseUrl}/products?page=${page}&pageSize=${pageSize}`;

    if (categoryId) {
      url += `&categoryId=${categoryId}`;
    }

    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    this.loading.set(true);

    return this.http.get<PagedResult<ProductListItem>>(url).pipe(
      tap(result => {

        this.products.set(result.items);

        this.totalCount.set(result.totalCount);

        this.totalPages.set(result.totalPages);

        this.pageNumber.set(result.pageNumber);

        this.pageSize.set(result.pageSize);

        this.loading.set(false);

      })
    );
  }

  refresh(): Observable<PagedResult<ProductListItem>> {

    return this.getProducts(
      this.pageNumber(),
      this.pageSize()
    );

  }

  getFeaturedProducts(): Observable<ProductListItem[]> {

    return this.http.get<ProductListItem[]>(
      `${this.api.baseUrl}/products/featured`
    ).pipe(
      tap(products => this.featuredProducts.set(products))
    );

  }

  getProductById(id: number): Observable<Product> {

    return this.http.get<Product>(
      `${this.api.baseUrl}/products/${id}`
    );

  }

  createProduct(dto: CreateProduct): Observable<Product> {

    return this.http.post<Product>(
      `${this.api.baseUrl}/products`,
      dto
    );

  }

  updateProduct(id: number, dto: UpdateProduct): Observable<Product> {

    return this.http.put<Product>(
      `${this.api.baseUrl}/products/${id}`,
      dto
    );

  }

  deleteProduct(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.api.baseUrl}/products/${id}`
    );

  }

  uploadImage(
    productId: number,
    file: File,
    altText: string,
    isPrimary: boolean
  ): Observable<any> {

    const formData = new FormData();

    formData.append('file', file);
    formData.append('altText', altText);
    formData.append('isPrimary', isPrimary.toString());

    return this.http.post(
      `${this.api.baseUrl}/products/${productId}/images/upload`,
      formData
    );

  }

  removeImage(
    productId: number,
    imageId: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.api.baseUrl}/products/${productId}/images/${imageId}`
    );

  }

}