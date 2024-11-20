import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/auth/registration/registration.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout/main-layout.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path : 'login',
        component : LoginComponent
    },
    {
      path : 'home-component',
      component : HomeComponent
    },
    {
      path : 'registration',
      component : RegistrationComponent
    },
    {
      path : 'home',
      component : MainLayoutComponent
    }

];
