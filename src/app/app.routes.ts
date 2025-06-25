import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UserProfileComponent } from './page/user-profile/user-profile.component';
import { ForgotPasswordComponent } from './page/forgot-password/forgot-password.component';
import { WishlistComponent } from './page/wishlist/wishlist.component';
import { OrderSuccessComponent } from './page/order-success/order-success.component';
import { BookComponent } from './page/book/book.component';
import { CartComponent } from './page/cart/cart.component';
import { OrdersComponent } from './page/orders/orders.component';
import { AuthGuardService } from './Services/Auth-Guard/auth-guard.service';

export const routes: Routes = [
 {
    path: 'login',
    loadComponent: () =>
      import('./component/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    redirectTo: '/login/',
    pathMatch: 'full',
  },
  {
    path: 'forgotPassword',
    loadComponent: () =>
      import('./page/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
      ),
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    loadComponent: () =>
      import('./component/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    children: [
      {
        path: 'profile',
        loadComponent: () =>
          import('./page/user-profile/user-profile.component').then(
            (m) => m.UserProfileComponent
          ),
      },
      {
        path: 'book/:id',
        loadComponent: () =>
          import('./page/book/book.component').then(
            (m) => m.BookComponent
          ),
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./page/wishlist/wishlist.component').then(
            (m) => m.WishlistComponent
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./page/cart/cart.component').then(
            (m) => m.CartComponent
          ),
      },
      {
        path: 'orderSuccess',
        loadComponent: () =>
          import('./page/order-success/order-success.component').then(
            (m) => m.OrderSuccessComponent
          ),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./page/orders/orders.component').then(
            (m) => m.OrdersComponent
          ),
      },
    ],
  },

];
