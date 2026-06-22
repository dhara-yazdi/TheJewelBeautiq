import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Dashboard } from '../../../shared/models/auth.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, LoadingSpinnerComponent, CurrencyPipe, DatePipe],
  template: `
    <div>
      <h1 class="text-2xl font-bold text-luxury-white mb-8">Dashboard</h1>

      @if (loading()) {
        <app-loading-spinner />
      } @else if (dashboard()) {
        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div class="bg-luxury-dark border border-luxury-gray rounded-lg p-6">
            <p class="text-luxury-silver text-sm">Total Products</p>
            <p class="text-3xl font-bold text-gold mt-2">{{ dashboard()!.totalProducts }}</p>
          </div>
          <div class="bg-luxury-dark border border-luxury-gray rounded-lg p-6">
            <p class="text-luxury-silver text-sm">Categories</p>
            <p class="text-3xl font-bold text-gold mt-2">{{ dashboard()!.totalCategories }}</p>
          </div>
          <div class="bg-luxury-dark border border-luxury-gray rounded-lg p-6">
            <p class="text-luxury-silver text-sm">Total Inquiries</p>
            <p class="text-3xl font-bold text-gold mt-2">{{ dashboard()!.totalInquiries }}</p>
          </div>
          <div class="bg-luxury-dark border border-luxury-gray rounded-lg p-6">
            <p class="text-luxury-silver text-sm">Unread Inquiries</p>
            <p class="text-3xl font-bold text-red-400 mt-2">{{ dashboard()!.unreadInquiries }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Recent Products -->
          <div class="bg-luxury-dark border border-luxury-gray rounded-lg p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-semibold text-luxury-white">Recent Products</h2>
              <a routerLink="/admin/products" class="text-gold text-sm hover:text-gold-light">View All &rarr;</a>
            </div>
            <div class="space-y-3">
              @for (p of dashboard()!.recentProducts; track p.id) {
                <div class="flex items-center justify-between py-3 border-b border-luxury-gray last:border-0">
                  <div>
                    <p class="text-luxury-white text-sm font-medium">{{ p.name }}</p>
                    <p class="text-luxury-silver text-xs">{{ p.categoryName }}</p>
                  </div>
                  <p class="text-gold font-semibold">{{ p.price | currency }}</p>
                </div>
              } @empty {
                <p class="text-luxury-silver text-sm">No products yet.</p>
              }
            </div>
          </div>

          <!-- Recent Inquiries -->
          <div class="bg-luxury-dark border border-luxury-gray rounded-lg p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-semibold text-luxury-white">Recent Inquiries</h2>
              <a routerLink="/admin/inquiries" class="text-gold text-sm hover:text-gold-light">View All &rarr;</a>
            </div>
            <div class="space-y-3">
              @for (i of dashboard()!.recentInquiries; track i.id) {
                <div class="flex items-center justify-between py-3 border-b border-luxury-gray last:border-0">
                  <div>
                    <p class="text-luxury-white text-sm font-medium">{{ i.name }}</p>
                    <p class="text-luxury-silver text-xs">{{ i.subject }}</p>
                  </div>
                  <div class="text-right">
                    <span [class]="i.isRead ? 'text-luxury-silver text-xs' : 'text-gold text-xs font-semibold'">
                      {{ i.isRead ? 'Read' : 'New' }}
                    </span>
                    <p class="text-luxury-silver text-xs mt-1">{{ i.createdAt | date:'short' }}</p>
                  </div>
                </div>
              } @empty {
                <p class="text-luxury-silver text-sm">No inquiries yet.</p>
              }
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class DashboardComponent implements OnInit {
  dashboard = signal<Dashboard | null>(null);
  loading = signal(true);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getDashboard().subscribe({
      next: data => { this.dashboard.set(data); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }
}
