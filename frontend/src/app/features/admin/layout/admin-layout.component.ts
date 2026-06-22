import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-luxury-black flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-luxury-dark border-r border-luxury-gray fixed h-full">
        <div class="p-6 border-b border-luxury-gray">
          <h2 class="text-xl font-bold gold-gradient-text">Admin Panel</h2>
          <p class="text-xs text-luxury-silver mt-1">{{ authService.fullName() }}</p>
        </div>
        <nav class="p-4 space-y-1">
          <a routerLink="/admin/dashboard" routerLinkActive="bg-gold/10 text-gold border-r-2 border-gold"
             class="flex items-center px-4 py-3 text-luxury-silver hover:text-gold hover:bg-gold/5 rounded-l transition-colors">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Dashboard
          </a>
          <a routerLink="/admin/categories" routerLinkActive="bg-gold/10 text-gold border-r-2 border-gold"
             class="flex items-center px-4 py-3 text-luxury-silver hover:text-gold hover:bg-gold/5 rounded-l transition-colors">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            Categories
          </a>
          <a routerLink="/admin/products" routerLinkActive="bg-gold/10 text-gold border-r-2 border-gold"
             class="flex items-center px-4 py-3 text-luxury-silver hover:text-gold hover:bg-gold/5 rounded-l transition-colors">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
            Products
          </a>
          <a routerLink="/admin/inquiries" routerLinkActive="bg-gold/10 text-gold border-r-2 border-gold"
             class="flex items-center px-4 py-3 text-luxury-silver hover:text-gold hover:bg-gold/5 rounded-l transition-colors">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Inquiries
          </a>
        </nav>
        <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-luxury-gray">
          <button (click)="authService.logout()" class="w-full text-left flex items-center px-4 py-3 text-luxury-silver hover:text-red-400 transition-colors">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            Logout
          </button>
          <a routerLink="/" class="flex items-center px-4 py-2 text-xs text-luxury-silver hover:text-gold transition-colors mt-1">
            &larr; Back to Website
          </a>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 ml-64 p-8">
        <router-outlet />
      </main>
    </div>
  `
})
export class AdminLayoutComponent {
  constructor(public authService: AuthService) {}
}
