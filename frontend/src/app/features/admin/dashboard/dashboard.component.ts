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
  templateUrl: './dashboard.component.html'
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
