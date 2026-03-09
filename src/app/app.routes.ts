// import { Routes } from '@angular/router';
// import { LoginComponent } from './core/auth/login/login.component';
// import { RegisterComponent } from './core/auth/register/register.component';
// import { authGuard } from './core/guards/auth-guard';
// import { guestGuard } from './core/guards/guest-guard';
// import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
// import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
// import { AllordersComponent } from './features/allorders/allorders.component';
// import { BrandsComponent } from './features/brands/brands.component';
// import { CartComponent } from './features/cart/cart.component';
// import { CashComponent } from './features/cash/cash/cash.component';
// import { CategoriesComponent } from './features/categories/categories.component';
// import { CheckoutComponent } from './features/checkout/checkout.component';
// import { DetailsComponent } from './features/details/details.component';
// import { NotfoundComponent } from './features/notfound/notfound.component';


// export const routes: Routes = [
//   {
// path:'',
// redirectTo:"home",
// pathMatch:'full'
//   },
//   {
//     path:'',
//     component:AuthLayoutComponent,
//     canActivate:[guestGuard],
//     children:[
//       {
//         path:'register',
//         component:RegisterComponent,
//         title:"register"

//       },
//       {
//         path:'login',
//         component:LoginComponent,
//         title:"login"

//       },

//     ]
//   },
//   {
//     path:'',
//     component:MainLayoutComponent,
//     canActivate:[authGuard],
//     children:[
//       {
//         path:'home',
//         loadComponent:()=>import('./features/home/home.component').then((c)=>c.HomeComponent),
//         title:"home"

//       },
//       {
//         path:'product',
//       loadComponent:()=>import('./features/products/products.component'),
//         title:"product"

//       },
//       {
//         path:'details/:slug/:id',
//         component:DetailsComponent,
//         title:"details"

//       },

//       {
//         path:'checkout/:id',
//         component:CheckoutComponent,
//         title:"checkout"

//       },
//       {
//         path:'cash',
//         component:CashComponent,
//         title:"cash"

//       },
//       {
//         path:'allorders',
//         component:AllordersComponent,
//         title:"Orders"

//       },
//       {
//         path:'brands',
//         component:BrandsComponent,
//         title:"brands"

//       },
//       {
//         path:'cart',
//         component:CartComponent,
//         title:"cart"

//       },
//       {
//         path:'categories',
//         component:CategoriesComponent,
//         title:"categories"

//       },



//     ]
//   },
//   {
//     path:'**',
// component:NotfoundComponent,
//    title:'error'
//   }
// ];



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
