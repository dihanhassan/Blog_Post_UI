import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/auth/registration/registration.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout/main-layout.component';
import { ViewPostComponent } from './shared/components/view-post/view-post/view-post.component';

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
      path : 'content',
      component : MainLayoutComponent,
    },
    {
      path : 'content/view-post/:id',
      component : ViewPostComponent
    }

];
