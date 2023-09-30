import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent {
  id!: number;
  post!: Post;
  postForm!: FormGroup;
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public service: PostService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  goBackToPrevPage(): void {
    this.location.back();
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    // console.log('edit-post component begin onInit');
    this.initializeForm();
    //-------------------------------------------------------
    this.id = this.route.snapshot.params['id'];
    // console.log('id : ', this.id);
    this.service.getPost(this.id).subscribe((data: Post) => {
      this.post = data;
      this.postForm.patchValue(data);
    });
    //-------------------------------------------------------
    // console.log('edit-post component end onInit');
  }

  initializeForm() {
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required),
    });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  get f() {
    return this.postForm.controls;
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  submit() {
    console.log(this.postForm.value);
    this.service
      .updatePost(this.id, this.postForm.value)
      .subscribe((res: any) => {
        console.log('Post updated successfully!');
        this.router.navigateByUrl('posts');
      });
  }
}
