import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div class="flex justify-center items-center py-12">
      <div class="w-12 h-12 border-4 border-luxury-gray border-t-gold rounded-full animate-spin"></div>
    </div>
  `
})
export class LoadingSpinnerComponent {}
