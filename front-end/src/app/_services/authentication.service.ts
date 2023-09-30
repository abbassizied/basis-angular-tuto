import { Injectable } from '@angular/core';
import { BASE_URL } from '../_utils/api';
import { User } from '../users/user';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import jwtDecode, { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUser: User = {
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    role: [],
  };

  constructor(
    private tsService: TokenStorageService,
    private http: HttpClient,
    public router: Router
  ) {}

  // Sign-in
  login(user: User) {
    let loginUrl: string = BASE_URL + '/login';
    return this.http.post<any>(loginUrl, user).subscribe((res: any) => {
      // console.log('res from login: ', res);
      let accessToken: string = res.token;
      let refreshToken: string = res.refreshToken;
      let decodedToken: any = jwtDecode<JwtPayload>(accessToken);
      let userId: number = decodedToken.id;
      // console.log('decoded token', decodedToken);
      this.tsService.saveAccessToken(accessToken);
      this.tsService.saveRefreshToken(refreshToken);
      this.getUserProfile(userId).subscribe((res) => {
        // console.log('res from getUserProfile: ', res);
        this.currentUser = { ...res };
        console.log('currentUser: ', this.currentUser);
        this.router.navigate(['user', this.currentUser.id, 'user-profile']);
      });
    });
  }

  logout() {
    let logoutUrl: string = BASE_URL + '/logout';
    this.http
      .post(logoutUrl, { refreshToken: this.tsService.getRefreshToken() })
      .subscribe(() => {
        let removeTokens = this.tsService.clean();
        this.currentUser = {
          email: '',
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          role: [],
        };
        if (removeTokens == null) {
          // console.log('1-logouuuuuuuuuuuuuut');
          this.router.navigate(['login']);
        }
        // console.log('2-logouuuuuuuuuuuuuut');
      });
  }

  // Sign-up
  register(user: User): Observable<any> {
    let registerUrl: string = BASE_URL + '/register';
    return this.http.post(registerUrl, user).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
  // ------------------------------------------------------------------
  // define function to get new access token using refresh token
  refreshAccessToken = () => {
    console.log('calling refresh endpoint ...');
    let refreshUrl: string = BASE_URL + '/refresh';
    return this.http
      .post(refreshUrl, {
        withCredentials: true,
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  };
  // ------------------------------------------------------------------
  get isAdmin(): boolean {
    return this.currentUser.role.some((x) => x === 'Admin');
  }

  // User profile
  getUserProfile(id: any): Observable<any> {
    let userProfileUrl: string = BASE_URL + `/users/${id}`;
    return this.http.get(userProfileUrl).pipe(
      map((res) => {
        return res || {};
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
