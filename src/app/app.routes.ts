import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UserProfileComponent } from './page/user-profile/user-profile.component';
import { ForgotPasswordComponent } from './page/forgot-password/forgot-password.component';
import { WishlistComponent } from './page/wishlist/wishlist.component';

export const routes: Routes = [
    {
        path:"login",component:LoginComponent
    },
    {
        path:"home",component:DashboardComponent
    },
    {
        path:"user-profile",component:UserProfileComponent
    },
    {
        path:"forgot-password",component:ForgotPasswordComponent
    },
    {
        path:"wishlist",component:WishlistComponent
    }

];
