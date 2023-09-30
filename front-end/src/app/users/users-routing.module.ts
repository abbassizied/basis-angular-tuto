import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
// import { UserProfileComponent } from './user-profile/user-profile.component';

const usersRoutes: Routes = [
  { path: '', component: UserListComponent, data: { title: "Users'List" } },
  {
    path: 'user/:id/view',
    component: UserDetailComponent,
    data: { title: 'User Details' },
  },
  {
    path: 'user/add',
    component: AddUserComponent,
    data: { title: 'Add User' },
  },
  {
    path: 'user/:id/edit',
    component: EditUserComponent,
    data: { title: 'Edit User' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
