import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule, // I will use Template-driven approach for add post.
  ReactiveFormsModule, // I will use  model-driven approach for edit post.
} from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    UserDetailComponent,
    UserListComponent,
    AddUserComponent,
    EditUserComponent,
    UserProfileComponent,
  ],
  imports: [CommonModule, UsersRoutingModule, FormsModule, ReactiveFormsModule],
})
export class UsersModule {}
