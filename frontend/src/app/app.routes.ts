import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/public/home/home.component').then(m => m.HomeComponent)
  },
  // {
  //   path: 'collections',
  //   loadComponent: () => import('./features/public/collections/collections.component').then(m => m.CollectionsComponent)
  // },
  {
    path: 'collections',
    loadComponent: () => import('./shared/components/coming-soon/coming-soon.component').then(m => m.ComingSoonComponent)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./features/public/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./features/public/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/public/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./features/admin/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'categories',
        loadComponent: () => import('./features/admin/category-management/category-management.component').then(m => m.CategoryManagementComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./features/admin/product-management/product-management.component').then(m => m.ProductManagementComponent)
      },
      {
        path: 'products/:id/images',
        loadComponent: () => import('./features/admin/image-upload/image-upload.component').then(m => m.ImageUploadComponent)
      },
      {
        path: 'inquiries',
        loadComponent: () => import('./features/admin/inquiry-management/inquiry-management.component').then(m => m.InquiryManagementComponent)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
