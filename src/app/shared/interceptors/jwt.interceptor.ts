import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserLoginResponse } from '../api-models';
import { Router } from '@angular/router';
import { switchMap, take, catchError, filter } from 'rxjs/operators';
import { UserAuthenticateState } from '../../store/user-authentication/user-authentication.state';
import { userAuthenticateAction } from '../../store/user-authentication/user-authentication.action';
import { ApiService } from '../services/api.service';
import { Token } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private refreshTokenInProgress: Observable<any> | null = null;
  constructor(private store: Store, private router: Router,private apiService : ApiService,private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(UserAuthenticateState.getToken).pipe(
      take(1),
      switchMap(token =>{
        if(token){
          req = this.addTokenHeader(req, token);
        }
        return next.handle(req).pipe(
          catchError((error: HttpErrorResponse) => {
            if(error.status === 401){
              return this.handle401Error(req, next);
            }
            
            if (error.status === 403) {
              this.toastr.warning('Access Denied! You do not have permission.', 'Forbidden');
            }
            if (req.url.includes('api/user-management/login')) {
              this.toastr.error('Invalid email or password.', 'Login Failed');
            }
            
            return throwError(error);
          })
        );
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(UserAuthenticateState.getRefreshToken).pipe(
      take(1),
      switchMap(refreshToken => {
        if (refreshToken == "") {
          this.router.navigate(['/login']);
          return throwError('No refresh token available');
        }

        this.refreshTokenInProgress = this.apiService.getAccessToken(refreshToken!).pipe(
          switchMap((newTokens: UserLoginResponse | null) => {
            if (!newTokens) {
              this.store.dispatch(new userAuthenticateAction.ClearResult());
              this.router.navigate(['/login']);
              return throwError('Failed to refresh token');
              
            }
            this.store.dispatch(new userAuthenticateAction.UpdateTokens(newTokens.token, newTokens.refreshToken));

            request = this.addTokenHeader(request, newTokens.token);
            return next.handle(request);
          }),
          catchError(err => {
            
            this.store.dispatch(new userAuthenticateAction.ClearResult());
            this.router.navigate(['/login']);
            return throwError(err);
          }),
          
          switchMap(response => {
            return of(response);
          })
        );

        return this.refreshTokenInProgress;
      })
    );
}

  private addTokenHeader(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
  }
}