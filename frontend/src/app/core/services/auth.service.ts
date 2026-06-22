import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { LoginRequest, AuthResponse, Dashboard } from '../../shared/models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenSignal = signal<string | null>(this.getStoredToken());
  private usernameSignal = signal<string>(localStorage.getItem('admin_username') ?? '');
  private fullNameSignal = signal<string>(localStorage.getItem('admin_fullName') ?? '');

  isAuthenticated = computed(() => !!this.tokenSignal());
  username = computed(() => this.usernameSignal());
  fullName = computed(() => this.fullNameSignal());
  token = computed(() => this.tokenSignal());

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router
  ) {}

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api.baseUrl}/auth/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('admin_token', response.token);
        localStorage.setItem('admin_username', response.username);
        localStorage.setItem('admin_fullName', response.fullName);
        localStorage.setItem('admin_expiresAt', response.expiresAt);
        this.tokenSignal.set(response.token);
        this.usernameSignal.set(response.username);
        this.fullNameSignal.set(response.fullName);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    localStorage.removeItem('admin_fullName');
    localStorage.removeItem('admin_expiresAt');
    this.tokenSignal.set(null);
    this.usernameSignal.set('');
    this.fullNameSignal.set('');
    this.router.navigate(['/admin/login']);
  }

  getDashboard(): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.api.baseUrl}/auth/dashboard`);
  }

  private getStoredToken(): string | null {
    const token = localStorage.getItem('admin_token');
    const expiresAt = localStorage.getItem('admin_expiresAt');
    if (token && expiresAt && new Date(expiresAt) > new Date()) {
      return token;
    }
    return null;
  }
}
