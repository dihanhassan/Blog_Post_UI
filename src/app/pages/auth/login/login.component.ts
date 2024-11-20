import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { NgClass, NgIf } from '@angular/common';
import { UserLoginRequest, UserLoginResponse } from '../../../shared/api-models/index';
import { ApiService } from '../../../shared/services/api.service';
import { Store } from '@ngxs/store';
import { userAuthenticateAction } from '../../../store/user-authentication/user-authentication.action';
import { UserAuthenticateState } from '../../../store/user-authentication/user-authentication.state';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    NgIf,
    NgClass,
    RouterModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corrected from `styleUrl` to `styleUrls`
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup;
  showPassword = false;
  data: UserLoginResponse | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.resolveNaviage();
    // Initializing the form with validators for email and password
    this.initializeForm();
  }

  private initializeForm(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      rememberMe: [false]
    });
  }
  // Getter for easy access to form fields
  get f(): any {
    return this.signInForm.controls;
  }

  togglePasswordVisibility(): void {  // Add this method
    this.showPassword = !this.showPassword;
  }

  // Method to handle form submission

  async signIn() {
    //this.signInForm.markAllAsTouched();
    if (true||this.signInForm.valid) {
      const userLogIn: UserLoginRequest = this.signInForm.value;
      await this.store.dispatch(new userAuthenticateAction.UserLogin(userLogIn.email, userLogIn.password)).toPromise();
    }
    else {
      this.signInForm.markAllAsTouched();
    }

    this.resolveNaviage();
  }
  async signUp(){
    this.router.navigate(['/registration']);
  }
  resolveNaviage(){
    this.store.select(UserAuthenticateState.isLogedIn).pipe(take(1)).subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.toastr.success('Login Successfull');
        this.router.navigate(['/content']);
      }
      else {
        
      }
    });
  }
}
