# Notes

- [Angular en français - site web I](https://angular.fr/)
- [Angular en français - site web II](https://guide-angular.wishtack.io/)
#### refresh-token
- [Angular 14 - JWT Authentication with Refresh Tokens Example & Tutorial](https://jasonwatmore.com/post/2022/12/08/angular-14-jwt-authentication-with-refresh-tokens-example-tutorial)
- [Angular 16 JWT refresh token example & Interceptor - Handle token expiration in Angular 16 - Refresh token before expiration tutorial example](https://github.com/bezkoder/angular-16-refresh-token/tree/master/src)
- [Angular JWT refresh token with Interceptor, handle token expiration in Angular 15 - Refresh token before expiration example](https://github.com/bezkoder/angular-15-refresh-token)
- [Angular 16 Refresh Token with JWT & Interceptor example](https://www.bezkoder.com/angular-16-refresh-token/)
- [HTTP Interceptors in Angular](https://medium.com/@jaydeepvpatil225/http-interceptors-in-angular-6e9891ae0538)
- [⭐️⭐️ Manage HTTP Requests In Angular: Http Interceptor](https://www.c-sharpcorner.com/article/manage-http-requests-in-angular-http-interceptor/)
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()

####
- [List of awesome CSS frameworks in 2023](https://github.com/abbassizied/awesome-css-frameworks)
- [PureCss - A set of small, responsive CSS modules that you can use in every web project.](https://purecss.io/)


## Two-way binding 

- The [()] syntax combines the brackets of property binding, [], with the parentheses of event binding, (), as follows :


## @ViewChild

- It's one of the most commonly used decorators.
- Property decorator that configures a view query. The change detector looks for the first element or the directive matching the selector in the view DOM. If the view DOM changes, and a new child matches the selector, the property is updated.


## @ViewChildren && @ContentChildren
- @ViewChildren est une décorateur Angular qui vous permet de récupérer une référence à un ou plusieurs éléments enfants de votre vue.
- Il est important de noter que @ViewChildren ne sera disponible que lorsque la vue a été initialisée. Si vous avez besoin d'accéder aux éléments plus tôt, vous devriez utiliser @ContentChildren, qui est similaire à @ViewChildren mais s'applique aux éléments enfants du composant au lieu de la vue. 


# Standalone Component 

- Components, directives, and pipes can now be declared as standalone.
```
ng g component --standalone my-component

//----------------------------
@Component({
  selector: 'ns-image',
  standalone: true,
  templateUrl: './image.component.html'
})
export class ImageComponent {
}

@Component({
  selector: 'ns-user',
  standalone: true,
  imports: [ImageComponent],  // <-----------------
  templateUrl: './user.component.html' 
  // uses `<ns-image>`
})
export class UserComponent {
}

```
 

## Guards 

```
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
```

```
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

export const AuthGuard = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if(!auth.isAuthenticated()) {
        router.navigateByUrl('/login')
        return false
    }
    return true
}

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],  // Vérifie si l'utilisateur est authentifié avant de lui permettre d'accéder à la route
	canActivateChild: [CanActivateChildGuard], // Vérifie si l'enfant de la route peut être activé
    children: [
      {
        path: '',
        component: AdminComponent
      },
      {
        path: 'users',
        component: UsersComponent
      }
    ]
  }
];
```


```
import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const CanActivateChildGuard = () => {
    return true
}
```
 