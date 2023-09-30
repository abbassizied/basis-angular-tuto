import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { AuthGuard } from './_guards/auth.guard';
import { adminGuard } from './_guards/admin.guard';

/*
There are five different types of Guards:
  - CanActivate: checks to see if a user can visit a route.
  - CanActivateChild: checks to see if a user can visit a route’s children.
  - CanDeactivate: checks to see if a user can exit a route.
  - Resolve: performs route data retrieval before route activation.
  - CanLoad: checks to see if a user can route to a module that is lazy loaded.
*/

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' },
    canActivate: [AuthGuard],
  }, // Needs to be logged in to access!
  {
    path: 'posts',
    canActivateChild: [AuthGuard],
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./posts/posts.module').then((m) => m.PostsModule),
  }, // Needs to be logged in to access!
  {
    path: 'todos',
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./todos/todos.module').then((m) => m.TodosModule),
  },
  {
    path: 'users',
    canActivateChild: [AuthGuard],
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'angular-components',
    loadChildren: () =>
      import('./angular-components/angular-components.module').then(
        (m) => m.AngularComponentsModule
      ),
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'About' },
    canActivate: [AuthGuard],
  },
  {
    path: 'user/:id/user-profile',
    canActivate: [AuthGuard],
    component: UserProfileComponent,
    data: { title: 'User Profile' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' },
  },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    data: { title: 'Unauthorized' },
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: 'Page Not Found' },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
      //  { enableTracing: true } // <-- debugging purposes only
    ),
  ] /*path location strategy */,
  /*RouterModule.forRoot(appRoutes, { useHash: true }) */ /*Hashlocationstrategy */
  exports: [RouterModule],
})
export class AppRoutingModule {}
