import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { WhatsappButtonComponent } from './shared/components/whatsapp-button/whatsapp-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, WhatsappButtonComponent],
  template: `
    @if (!isAdminRoute()) {
      <app-navbar />
    }
    <router-outlet />
    @if (!isAdminRoute()) {
      <app-footer />
      <app-whatsapp-button />
    }
  `
})
export class AppComponent {
  private router = inject(Router);

  isAdminRoute = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects.startsWith('/admin'))
    ),
    { initialValue: false }
  );
}
