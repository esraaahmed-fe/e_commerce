


import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [
  // Auth Layout
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/auth-layout/auth-layout.component').then(
        (c) => c.AuthLayoutComponent
      ),
    canActivate: [guestGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/login/login.component').then(
            (c) => c.LoginComponent
          ),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/auth/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        title: 'Register',
      },
    ],
  },

  // Main Layout
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/main-layout/main-layout.component').then(
        (c) => c.MainLayoutComponent
      ),
    canActivate: [authGuard],
    children: [
      {
              path:'home',
        loadComponent:()=>import('./features/home/home.component').then((c)=>c.HomeComponent),
        title:"home"

      },
      {
        path:'product',
      loadComponent:()=>import('./features/products/products.component').then((c)=>c.ProductsComponent),
        title:"product"

      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },

      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/cart.component').then(
            (c) => c.CartComponent
          ),
        title: 'Cart',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/brands/brands.component').then(
            (c) => c.BrandsComponent
          ),
        title: 'Brands',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
        title: 'Categories',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./features/details/details.component').then(
            (c) => c.DetailsComponent
          ),
        title: 'Product Details',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./features/checkout/checkout.component').then(
            (c) => c.CheckoutComponent
          ),
        title: 'Checkout',
      },
      {
        path: 'cash',
        loadComponent: () =>
          import('./features/cash/cash/cash.component').then(
            (c) => c.CashComponent
          ),
        title: 'Cash Payment',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./features/allorders/allorders.component').then(
            (c) => c.AllordersComponent
          ),
        title: 'All Orders',
      },
    ],
  },

  // Not Found
  {
    path: '**',
    loadComponent: () =>
      import('./features/notfound/notfound.component').then(
        (c) => c.NotfoundComponent
      ),
    title: 'Page Not Found',
  },
];
