import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CategoryResponse, PostCategoryResponse, UserLoginRequest, UserLoginResponse } from '../api-models';
import { error } from "console";
import { PostsResponse } from "../api-models/response/post/post-response.model";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = '';
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiBaseUrl;
  }
 
  handleError(error: HttpErrorResponse) {
    return of(null);
  }
  private getData(url : string) : Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${url}`).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }
  private postData(url : string , data : any) : Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.apiUrl}/${url}`,data,{headers})
  }

  private deleteData(url : string) : Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${url}`).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  userLogin(email: string , password: string) : Observable<UserLoginResponse | null> {
    const req = {email, password};
    return this.postData('api/user-management/login', req).pipe(
        map(x=>x.data),
        catchError(this.handleError)
    );
  }
  getAccessToken(refreshToken: string) : Observable<UserLoginResponse | null> {
    const req = {refreshToken};
    return this.postData(`api/user-management/refresh-token`,req).pipe(
      map(x=>x.data),
      catchError(this.handleError)
    );
  }

  getAllCategories() : Observable<CategoryResponse[] | null>{
    return this.getData('api/category-management/category').pipe(
      map(x=>x.data),
      catchError(this.handleError)
    );
  }
  getAllPostCategories() : Observable<PostCategoryResponse[] | null>{
    return this.getData('api/category-management/get-post-category').pipe(
      map(x=>x.data),
      catchError(this.handleError)
    );
  }
  getAllPosts() : Observable<PostsResponse[] | null>{
    return this.getData('api/post-management/get-all-posts').pipe(
      map(x=>x.data),
      catchError(this.handleError)
    );
  }

  getAllPostByCategoryId(categoryId : number) : Observable<PostsResponse[] | null>{
    return this.getData(`api/post-management/posts-by-category/${categoryId}`).pipe(
      map(x=>x.data),
      catchError(this.handleError)
    );
  }

}