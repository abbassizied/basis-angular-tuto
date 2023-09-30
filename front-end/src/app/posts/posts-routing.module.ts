import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { adminGuard } from '../_guards/admin.guard';

const postsRoutes: Routes = [
  { path: '', component: PostListComponent, data: { title: "Posts'List" } },
  { path: 'post/:id/view', component: PostDetailComponent, data: { title: 'Post Detail' } },
  { path: 'post/add', component: AddPostComponent, data: { title: 'Add Post' }},
  { path: 'post/:id/edit', component: EditPostComponent, data: { title: 'Edit Post' }},
];

@NgModule({
  imports: [RouterModule.forChild(postsRoutes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
