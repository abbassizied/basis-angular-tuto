import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit, AfterViewInit {
  title = 'Template driven forms';

  @ViewChild('f') form: any = {
    title: '',
    body: '',
  };

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public postService: PostService, private router: Router, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // ...
    this.changeDetectorRef.detectChanges();
  }

  addPost(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      console.log('Form Submitted!');
      this.postService.AddPost(this.form.value).subscribe((res: any) => {
        console.log('Post created successfully!');
        this.form.reset();
      });
      this.router.navigateByUrl('posts');
    }
  }

  goBack() {
    window.history.back();
  }
}
