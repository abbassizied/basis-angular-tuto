import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Post } from './post.model';
import { BASE_URL } from '../_utils/api';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  readonly postUrl: string = BASE_URL + '/posts';
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}
  // Get all objects
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl);
  }
  // Get single object
  getPost(id: any): Observable<Post> {
    return this.http
      .get<Post>(`${this.postUrl}/${id}`, { headers: this.httpHeaders })
      .pipe(
        map((res: any) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
  }
  // Add
  AddPost(data: Post): Observable<any> {
    return this.http
      .post(this.postUrl, data)
      .pipe(catchError(this.handleError));
  }
  // Update
  updatePost(id: any, data: Post): Observable<any> {
    return this.http
      .put(`${this.postUrl}/${id}`, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }
  // Delete
  deletePost(id: any): Observable<any> {
    return this.http
      .delete(`${this.postUrl}/${id}`, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }
  //
  deleteAllPosts(): Observable<any> {
    return this.http.delete(this.postUrl);
  }
  //
  findPostByTitle(title: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}?title=${title}`);
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }
}
