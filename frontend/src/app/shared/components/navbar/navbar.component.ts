import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 bg-luxury-black/95 backdrop-blur-sm border-b border-luxury-gray">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <a routerLink="/" class="flex items-center space-x-2">
            <span class="text-2xl font-bold gold-gradient-text tracking-wider">The Jewel Beautiq</span>
          </a>

          <div class="hidden md:flex items-center space-x-8">
            <a routerLink="/" routerLinkActive="text-gold" [routerLinkActiveOptions]="{exact: true}"
               class="text-luxury-white hover:text-gold transition-colors duration-300 tracking-wide">Home</a>
            <a routerLink="/collections" routerLinkActive="text-gold"
               class="text-luxury-white hover:text-gold transition-colors duration-300 tracking-wide">Collections</a>
            <a routerLink="/about" routerLinkActive="text-gold"
               class="text-luxury-white hover:text-gold transition-colors duration-300 tracking-wide">About Us</a>
            <a routerLink="/contact" routerLinkActive="text-gold"
               class="text-luxury-white hover:text-gold transition-colors duration-300 tracking-wide">Contact</a>
          </div>

          <button (click)="mobileMenuOpen.set(!mobileMenuOpen())"
                  class="md:hidden text-luxury-white hover:text-gold p-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              @if (mobileMenuOpen()) {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              } @else {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              }
            </svg>
          </button>
        </div>
      </div>

      @if (mobileMenuOpen()) {
        <div class="md:hidden bg-luxury-dark border-t border-luxury-gray">
          <div class="px-4 py-4 space-y-3">
            <a routerLink="/" (click)="mobileMenuOpen.set(false)"
               class="block text-luxury-white hover:text-gold transition-colors py-2">Home</a>
            <a routerLink="/collections" (click)="mobileMenuOpen.set(false)"
               class="block text-luxury-white hover:text-gold transition-colors py-2">Collections</a>
            <a routerLink="/about" (click)="mobileMenuOpen.set(false)"
               class="block text-luxury-white hover:text-gold transition-colors py-2">About Us</a>
            <a routerLink="/contact" (click)="mobileMenuOpen.set(false)"
               class="block text-luxury-white hover:text-gold transition-colors py-2">Contact</a>
          </div>
        </div>
      }
    </nav>
  `
})
export class NavbarComponent {
  mobileMenuOpen = signal(false);
}
