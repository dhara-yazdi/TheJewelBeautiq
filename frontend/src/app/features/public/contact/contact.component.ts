import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InquiryService } from '../../../core/services/inquiry.service';
import { CreateInquiry } from '../../../shared/models/inquiry.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="pt-24 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="section-title"><span class="gold-gradient-text">Contact Us</span></h1>
        <p class="text-luxury-silver text-center mb-12 max-w-2xl mx-auto">
          We'd love to hear from you. Whether you have a question about a piece or wish to
          schedule a private viewing, our team is here to help.
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Contact Info -->
          <div class="space-y-8">
            <div class="p-6 border border-luxury-gray rounded-lg">
              <h3 class="text-gold font-semibold mb-3">Visit Us</h3>
              <p class="text-luxury-silver text-sm">123 Luxury Avenue<br>New York, NY 10001</p>
            </div>
            <div class="p-6 border border-luxury-gray rounded-lg">
              <h3 class="text-gold font-semibold mb-3">Call Us</h3>
              <p class="text-luxury-silver text-sm">+1 (555) 123-4567</p>
            </div>
            <div class="p-6 border border-luxury-gray rounded-lg">
              <h3 class="text-gold font-semibold mb-3">Email Us</h3>
              <p class="text-luxury-silver text-sm">info&#64;luxejewels.com</p>
            </div>
            <div class="p-6 border border-luxury-gray rounded-lg">
              <h3 class="text-gold font-semibold mb-3">Business Hours</h3>
              <p class="text-luxury-silver text-sm">Mon - Fri: 10am - 7pm<br>Sat: 10am - 6pm<br>Sun: 12pm - 5pm</p>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="lg:col-span-2">
            @if (submitted()) {
              <div class="text-center py-16 border border-gold/30 rounded-lg bg-gold/5">
                <div class="text-5xl mb-4 text-gold">&#10003;</div>
                <h3 class="text-2xl font-bold text-luxury-white mb-3">Thank You!</h3>
                <p class="text-luxury-silver">Your inquiry has been submitted. We'll get back to you within 24 hours.</p>
                <button (click)="resetForm()" class="btn-outline-gold mt-6">Send Another Inquiry</button>
              </div>
            } @else {
              <form (ngSubmit)="onSubmit()" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm text-luxury-silver mb-2">Full Name *</label>
                    <input type="text" [(ngModel)]="form.name" name="name" required class="input-luxury" placeholder="Your name" />
                  </div>
                  <div>
                    <label class="block text-sm text-luxury-silver mb-2">Email *</label>
                    <input type="email" [(ngModel)]="form.email" name="email" required class="input-luxury" placeholder="your&#64;email.com" />
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm text-luxury-silver mb-2">Phone</label>
                    <input type="tel" [(ngModel)]="form.phone" name="phone" class="input-luxury" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label class="block text-sm text-luxury-silver mb-2">Subject *</label>
                    <input type="text" [(ngModel)]="form.subject" name="subject" required class="input-luxury" placeholder="How can we help?" />
                  </div>
                </div>
                <div>
                  <label class="block text-sm text-luxury-silver mb-2">Message *</label>
                  <textarea [(ngModel)]="form.message" name="message" required rows="6" class="input-luxury resize-none" placeholder="Tell us about your inquiry..."></textarea>
                </div>
                <button type="submit" [disabled]="submitting()" class="btn-gold w-full text-lg">
                  {{ submitting() ? 'Sending...' : 'Send Inquiry' }}
                </button>
              </form>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class ContactComponent implements OnInit {
  form: CreateInquiry = { name: '', email: '', phone: '', subject: '', message: '', productId: null };
  submitted = signal(false);
  submitting = signal(false);

  constructor(
    private inquiryService: InquiryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['product']) {
        this.form.productId = +params['product'];
        this.form.subject = 'Product Inquiry';
      }
    });
  }

  onSubmit(): void {
    this.submitting.set(true);
    this.inquiryService.createInquiry(this.form).subscribe({
      next: () => { this.submitted.set(true); this.submitting.set(false); },
      error: () => this.submitting.set(false)
    });
  }

  resetForm(): void {
    this.form = { name: '', email: '', phone: '', subject: '', message: '', productId: null };
    this.submitted.set(false);
  }
}
