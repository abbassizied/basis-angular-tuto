import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('navBurger', { read: ElementRef }) navBurger: ElementRef =
    {} as ElementRef;
  @ViewChild('navMenu') navMenu: ElementRef = {} as ElementRef;

  constructor(
    public tsService: TokenStorageService,
    private authService: AuthenticationService
  ) {}

  ngAfterViewInit() {
    /*
    console.log('Values on ngAfterViewInit():');
    console.log('navBurger:', this.navBurger.nativeElement);
    console.log('navMenu:', this.navMenu.nativeElement);
    */
  }

  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }

  get id(): number | undefined {
    let userId: number | undefined = this.authService.currentUser.id;
    // console.log('------------ userId--------- ', userId)
    return userId;
  }

  logout() {
    this.authService.logout();
  }
}
