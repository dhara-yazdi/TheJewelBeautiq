import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { InquiryService } from '../../../core/services/inquiry.service';
import { Inquiry } from '../../../shared/models/inquiry.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-inquiry-management',
  standalone: true,
  imports: [LoadingSpinnerComponent, DatePipe],
  template: `
    <div>
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-luxury-white">Inquiry Management</h1>
        <div class="flex gap-2">
          <button (click)="filterStatus(undefined)"
                  [class]="activeFilter() === undefined ? 'btn-gold text-sm px-4 py-2' : 'btn-outline-gold text-sm px-4 py-2'">All</button>
          <button (click)="filterStatus(false)"
                  [class]="activeFilter() === false ? 'btn-gold text-sm px-4 py-2' : 'btn-outline-gold text-sm px-4 py-2'">Unread</button>
          <button (click)="filterStatus(true)"
                  [class]="activeFilter() === true ? 'btn-gold text-sm px-4 py-2' : 'btn-outline-gold text-sm px-4 py-2'">Read</button>
        </div>
      </div>

      @if (inquiryService.loading()) {
        <app-loading-spinner />
      } @else {
        <div class="space-y-4">
          @for (inq of inquiryService.inquiries(); track inq.id) {
            <div class="bg-luxury-dark border rounded-lg p-6 cursor-pointer"
                 [class]="inq.isRead ? 'border-luxury-gray' : 'border-gold/30'"
                 (click)="toggleDetail(inq)">
              <div class="flex justify-between items-start">
                <div>
                  <div class="flex items-center gap-3">
                    <h3 class="text-luxury-white font-semibold">{{ inq.name }}</h3>
                    @if (!inq.isRead) {
                      <span class="bg-gold text-luxury-black text-xs px-2 py-0.5 rounded font-semibold">New</span>
                    }
                  </div>
                  <p class="text-luxury-silver text-sm mt-1">{{ inq.subject }}</p>
                </div>
                <div class="text-right">
                  <p class="text-luxury-silver text-sm">{{ inq.createdAt | date:'medium' }}</p>
                  <p class="text-luxury-silver text-xs">{{ inq.email }}</p>
                </div>
              </div>

              @if (selectedInquiry()?.id === inq.id) {
                <div class="mt-4 pt-4 border-t border-luxury-gray">
                  <div class="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div><span class="text-luxury-silver">Phone:</span> <span class="text-luxury-white">{{ inq.phone || 'N/A' }}</span></div>
                    <div><span class="text-luxury-silver">Product:</span> <span class="text-luxury-white">{{ inq.productName || 'N/A' }}</span></div>
                  </div>
                  <p class="text-luxury-silver text-sm leading-relaxed mb-4">{{ inq.message }}</p>
                  <div class="flex gap-2">
                    @if (!inq.isRead) {
                      <button (click)="markAsRead(inq.id, $event)" class="btn-gold text-sm px-4 py-2">Mark as Read</button>
                    }
                    <button (click)="deleteInquiry(inq.id, $event)" class="bg-red-900/50 text-red-300 hover:bg-red-900 px-4 py-2 rounded text-sm transition-colors">Delete</button>
                  </div>
                </div>
              }
            </div>
          } @empty {
            <div class="text-center py-12 text-luxury-silver">No inquiries found.</div>
          }
        </div>
      }
    </div>
  `
})
export class InquiryManagementComponent implements OnInit {
  selectedInquiry = signal<Inquiry | null>(null);
  activeFilter = signal<boolean | undefined>(undefined);

  constructor(public inquiryService: InquiryService) {}

  ngOnInit(): void {
    this.loadInquiries();
  }

  loadInquiries(): void {
    this.inquiryService.getInquiries(1, 50, this.activeFilter()).subscribe();
  }

  filterStatus(isRead: boolean | undefined): void {
    this.activeFilter.set(isRead);
    this.loadInquiries();
  }

  toggleDetail(inq: Inquiry): void {
    this.selectedInquiry.set(this.selectedInquiry()?.id === inq.id ? null : inq);
  }

  markAsRead(id: number, event: Event): void {
    event.stopPropagation();
    this.inquiryService.markAsRead(id).subscribe(() => this.loadInquiries());
  }

  deleteInquiry(id: number, event: Event): void {
    event.stopPropagation();
    if (confirm('Delete this inquiry?')) {
      this.inquiryService.deleteInquiry(id).subscribe(() => {
        this.selectedInquiry.set(null);
        this.loadInquiries();
      });
    }
  }
}
