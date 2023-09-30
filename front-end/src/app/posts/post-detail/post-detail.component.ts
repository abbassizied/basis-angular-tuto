import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post.model';  

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit { 
  post!: Post;
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public service: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    let id:number = this.route.snapshot.params['id'];

    this.service.getPost(id).subscribe((data: Post) => {
      // console.log(data);
      this.post = data;
    });
  }

  goBack() {
    this.router.navigate(['/posts']);
  }
}
