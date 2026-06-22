import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-luxury-dark border-t border-luxury-gray mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 class="text-xl font-bold gold-gradient-text mb-4">LUXE JEWELS</h3>
            <p class="text-luxury-silver text-sm leading-relaxed">
              Crafting timeless elegance since 1985. Each piece tells a story of passion,
              precision, and uncompromising quality.
            </p>
          </div>

          <div>
            <h4 class="text-gold font-semibold mb-4 tracking-wide">EXPLORE</h4>
            <ul class="space-y-2">
              <li><a routerLink="/collections" class="text-luxury-silver hover:text-gold transition-colors text-sm">Collections</a></li>
              <li><a routerLink="/about" class="text-luxury-silver hover:text-gold transition-colors text-sm">About Us</a></li>
              <li><a routerLink="/contact" class="text-luxury-silver hover:text-gold transition-colors text-sm">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-gold font-semibold mb-4 tracking-wide">CONTACT</h4>
            <ul class="space-y-2 text-sm text-luxury-silver">
              <li>123 Luxury Avenue</li>
              <li>New York, NY 10001</li>
              <li>+1 (555) 123-4567</li>
              <li>info&#64;luxejewels.com</li>
            </ul>
          </div>

          <div>
            <h4 class="text-gold font-semibold mb-4 tracking-wide">HOURS</h4>
            <ul class="space-y-2 text-sm text-luxury-silver">
              <li>Mon - Fri: 10am - 7pm</li>
              <li>Saturday: 10am - 6pm</li>
              <li>Sunday: 12pm - 5pm</li>
            </ul>
          </div>
        </div>

        <div class="border-t border-luxury-gray mt-12 pt-8 text-center">
          <p class="text-luxury-silver text-sm">&copy; 2024 Luxe Jewels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
