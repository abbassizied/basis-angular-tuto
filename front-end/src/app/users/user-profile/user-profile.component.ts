import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  currentUser!: User;

  constructor(
    public authService: AuthenticationService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let id: number = this.actRoute.snapshot.params['id'];
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = {...res};
    });
  }
}
