import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, LoadingSpinnerComponent, CurrencyPipe],
  template: `
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-black/90 to-luxury-black"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent"></div>
      <div class="relative z-10 text-center px-4 max-w-4xl">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          <span class="gold-gradient-text">Timeless Elegance</span>
        </h1>
        <p class="text-xl md:text-2xl text-luxury-silver mb-10 leading-relaxed">
          Discover exquisite jewellery crafted with passion and precision.
          Each piece is a masterwork of artistry and luxury.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a routerLink="/collections" class="btn-gold text-lg">Explore Collections</a>
          <a routerLink="/contact" class="btn-outline-gold text-lg">Book Appointment</a>
        </div>
      </div>
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 class="section-title">
        <span class="gold-gradient-text">Featured Collection</span>
      </h2>
      <p class="text-luxury-silver text-center mb-12 max-w-2xl mx-auto">
        Our most coveted pieces, handpicked for their extraordinary beauty and craftsmanship.
      </p>

      @if (productService.loading()) {
        <app-loading-spinner />
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (product of productService.featuredProducts(); track product.id) {
            <a [routerLink]="['/product', product.id]" class="card-luxury group cursor-pointer">
              <div class="aspect-square bg-luxury-gray flex items-center justify-center overflow-hidden">
                <div class="text-6xl text-gold/30 group-hover:text-gold/50 transition-colors">&#9830;</div>
              </div>
              <div class="p-6">
                <p class="text-xs text-gold tracking-widest uppercase mb-2">{{ product.categoryName }}</p>
                <h3 class="text-lg font-semibold text-luxury-white group-hover:text-gold transition-colors mb-2">
                  {{ product.name }}
                </h3>
                <p class="text-gold font-bold text-xl">{{ product.price | currency }}</p>
              </div>
            </a>
          }
        </div>
      }

      <div class="text-center mt-12">
        <a routerLink="/collections" class="btn-outline-gold">View All Collections</a>
      </div>
    </section>

    <!-- Categories -->
    <section class="bg-luxury-dark py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="section-title">
          <span class="gold-gradient-text">Shop by Category</span>
        </h2>
        <p class="text-luxury-silver text-center mb-12 max-w-2xl mx-auto">
          Explore our curated collections across every category of fine jewellery.
        </p>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          @for (category of categoryService.categories(); track category.id) {
            <a [routerLink]="['/collections']" [queryParams]="{category: category.id}"
               class="group text-center p-6 rounded-lg border border-luxury-gray hover:border-gold/50 transition-all duration-300">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-luxury-gray flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                <span class="text-2xl text-gold">&#9830;</span>
              </div>
              <h3 class="text-luxury-white font-semibold group-hover:text-gold transition-colors">{{ category.name }}</h3>
              <p class="text-luxury-silver text-sm mt-1">{{ category.productCount }} pieces</p>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 class="section-title">
        <span class="gold-gradient-text">Why Choose Luxe Jewels</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
            <svg class="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-luxury-white mb-3">Certified Quality</h3>
          <p class="text-luxury-silver text-sm">Every gemstone is certified and every piece meets the highest standards of craftsmanship.</p>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
            <svg class="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-luxury-white mb-3">Luxury Packaging</h3>
          <p class="text-luxury-silver text-sm">Each piece arrives in our signature presentation box, perfect for gifting.</p>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
            <svg class="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-luxury-white mb-3">Lifetime Warranty</h3>
          <p class="text-luxury-silver text-sm">We stand behind our artistry with a lifetime warranty on all jewellery pieces.</p>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent implements OnInit {
  constructor(
    public productService: ProductService,
    public categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe();
    this.categoryService.getActiveCategories().subscribe();
  }
}
