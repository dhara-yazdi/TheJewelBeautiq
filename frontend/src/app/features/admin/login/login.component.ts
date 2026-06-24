import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-luxury-black">
      <div class="w-full max-w-md p-8">
        <div class="text-center mb-10">
          <h1 class="text-3xl font-bold gold-gradient-text mb-2">The Jewel Beautiq</h1>
          <p class="text-luxury-silver">Admin Portal</p>
        </div>

        <form (ngSubmit)="onLogin()" class="space-y-6 bg-luxury-dark p-8 rounded-lg border border-luxury-gray">
          <h2 class="text-xl font-semibold text-luxury-white text-center mb-6">Sign In</h2>

          @if (error()) {
            <div class="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded text-sm">
              {{ error() }}
            </div>
          }

          <div>
            <label class="block text-sm text-luxury-silver mb-2">Username</label>
            <input type="text" [(ngModel)]="username" name="username" required
                   class="input-luxury" placeholder="Enter username" autocomplete="username" />
          </div>

          <div>
            <label class="block text-sm text-luxury-silver mb-2">Password</label>
            <input type="password" [(ngModel)]="password" name="password" required
                   class="input-luxury" placeholder="Enter password" autocomplete="current-password" />
          </div>

          <button type="submit" [disabled]="loading()" class="btn-gold w-full text-lg">
            {{ loading() ? 'Signing in...' : 'Sign In' }}
          </button>

          <p class="text-center text-xs text-luxury-silver mt-4">
            Default credentials: admin / Admin&#64;123
          </p>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  loading = signal(false);
  error = signal('');

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  onLogin(): void {
    this.loading.set(true);
    this.error.set('');
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => { this.router.navigate(['/admin/dashboard']); this.loading.set(false); },
      error: () => { this.error.set('Invalid username or password'); this.loading.set(false); }
    });
  }
}
