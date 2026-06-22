import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { Inquiry, CreateInquiry } from '../../shared/models/inquiry.model';
import { PagedResult } from '../../shared/models/product.model';

@Injectable({ providedIn: 'root' })
export class InquiryService {
  inquiries = signal<Inquiry[]>([]);
  loading = signal(false);
  totalCount = signal(0);

  constructor(private http: HttpClient, private api: ApiService) {}

  getInquiries(page = 1, pageSize = 20, isRead?: boolean): Observable<PagedResult<Inquiry>> {
    let url = `${this.api.baseUrl}/inquiries?page=${page}&pageSize=${pageSize}`;
    if (isRead !== undefined) url += `&isRead=${isRead}`;

    this.loading.set(true);
    return this.http.get<PagedResult<Inquiry>>(url).pipe(
      tap(result => {
        this.inquiries.set(result.items);
        this.totalCount.set(result.totalCount);
        this.loading.set(false);
      })
    );
  }

  getInquiryById(id: number): Observable<Inquiry> {
    return this.http.get<Inquiry>(`${this.api.baseUrl}/inquiries/${id}`);
  }

  createInquiry(dto: CreateInquiry): Observable<Inquiry> {
    return this.http.post<Inquiry>(`${this.api.baseUrl}/inquiries`, dto);
  }

  markAsRead(id: number): Observable<void> {
    return this.http.patch<void>(`${this.api.baseUrl}/inquiries/${id}/read`, {});
  }

  deleteInquiry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.baseUrl}/inquiries/${id}`);
  }
}
