import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="pt-24 min-h-screen">
      <!-- Hero -->
      <section class="relative py-20 bg-gradient-to-b from-luxury-dark to-luxury-black">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            <span class="gold-gradient-text">Our Story</span>
          </h1>
          <p class="text-luxury-silver text-lg leading-relaxed">
            For nearly four decades, Luxe Jewels has been synonymous with extraordinary
            craftsmanship and timeless elegance in fine jewellery.
          </p>
        </div>
      </section>

      <!-- Story -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-3xl font-bold text-luxury-white mb-6">Heritage of Excellence</h2>
            <p class="text-luxury-silver leading-relaxed mb-4">
              Founded in 1985 by master jeweller Alessandro Rossi, Luxe Jewels began as a small
              atelier in the heart of New York City. With an unwavering commitment to quality and
              a passion for creating pieces that transcend trends, we have grown into one of the
              most respected names in luxury jewellery.
            </p>
            <p class="text-luxury-silver leading-relaxed mb-4">
              Each piece in our collection is meticulously handcrafted by our team of skilled
              artisans, using only the finest materials sourced from around the world. From
              ethically mined diamonds to rare coloured gemstones, we ensure every element meets
              our exacting standards.
            </p>
            <p class="text-luxury-silver leading-relaxed">
              Our philosophy is simple: jewellery should tell a story. Whether it's an engagement
              ring that marks the beginning of a new chapter or a statement necklace that
              celebrates a milestone, every Luxe Jewels creation is designed to be cherished
              for generations.
            </p>
          </div>
          <div class="aspect-[4/5] bg-luxury-dark border border-luxury-gray rounded-lg flex items-center justify-center">
            <div class="text-9xl text-gold/20">&#9830;</div>
          </div>
        </div>
      </section>

      <!-- Values -->
      <section class="bg-luxury-dark py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="section-title"><span class="gold-gradient-text">Our Values</span></h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            <div class="text-center p-8 border border-luxury-gray rounded-lg hover:border-gold/30 transition-colors">
              <h3 class="text-xl font-semibold text-gold mb-4">Craftsmanship</h3>
              <p class="text-luxury-silver text-sm leading-relaxed">
                Every piece is handcrafted by master artisans with decades of experience,
                ensuring perfection in every detail.
              </p>
            </div>
            <div class="text-center p-8 border border-luxury-gray rounded-lg hover:border-gold/30 transition-colors">
              <h3 class="text-xl font-semibold text-gold mb-4">Ethical Sourcing</h3>
              <p class="text-luxury-silver text-sm leading-relaxed">
                We are committed to responsible sourcing, ensuring all our materials are
                ethically obtained and conflict-free.
              </p>
            </div>
            <div class="text-center p-8 border border-luxury-gray rounded-lg hover:border-gold/30 transition-colors">
              <h3 class="text-xl font-semibold text-gold mb-4">Innovation</h3>
              <p class="text-luxury-silver text-sm leading-relaxed">
                While honouring traditional techniques, we embrace modern design and technology
                to create truly unique pieces.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 class="text-3xl font-bold text-luxury-white mb-6">Experience Luxury in Person</h2>
        <p class="text-luxury-silver mb-8">
          Visit our showroom to see our collections up close and receive personalised guidance
          from our expert team.
        </p>
        <a routerLink="/contact" class="btn-gold text-lg">Schedule a Visit</a>
      </section>
    </div>
  `
})
export class AboutComponent {}
