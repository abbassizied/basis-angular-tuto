import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule, // I will use Template-driven approach for add post.
  ReactiveFormsModule, // I will use  model-driven approach for edit post.
} from '@angular/forms';

import { PostsRoutingModule } from './posts-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

@NgModule({
  declarations: [
    PostListComponent,
    AddPostComponent,
    EditPostComponent,
    PostDetailComponent,
  ],
  imports: [CommonModule, PostsRoutingModule, FormsModule, ReactiveFormsModule],
})
export class PostsModule {}
