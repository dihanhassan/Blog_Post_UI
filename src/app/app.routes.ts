import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/Content/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path : 'login',
        component : LoginComponent
    },
    {
      path : 'home',
      component : HomeComponent
  },

];
