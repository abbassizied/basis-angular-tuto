import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
// import { CommonModule } from '@angular/common';

@Component({
  // standalone: true,
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  // imports: [CommonModule],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(private postService: PostService) {}
  ngOnInit() {
    this.postService.getAllPosts().subscribe((data: any) => {
      // console.log(data);
      this.posts = data;
      // console.log(this.Posts);
    });
  }

  deletePost(id:any) {
    if(confirm("Are you sure to delete ")) {
      // console.log("Implement delete functionality here");
      this.postService.deletePost(id).subscribe((res) => {
        this.posts = this.posts.filter((item) => item.id !== id);
        console.log('Post deleted successfully!');
      });
    } 
  }
}
