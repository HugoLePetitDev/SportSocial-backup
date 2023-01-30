import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { DarkThemeService } from './services/dark-theme.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const friend = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"/></svg>'
const shop = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M36.8 192H603.2c20.3 0 36.8-16.5 36.8-36.8c0-7.3-2.2-14.4-6.2-20.4L558.2 21.4C549.3 8 534.4 0 518.3 0H121.7c-16 0-31 8-39.9 21.4L6.2 134.7c-4 6.1-6.2 13.2-6.2 20.4C0 175.5 16.5 192 36.8 192zM64 224V384v80c0 26.5 21.5 48 48 48H336c26.5 0 48-21.5 48-48V384 224H320V384H128V224H64zm448 0V480c0 17.7 14.3 32 32 32s32-14.3 32-32V224H512z"/></svg>'
const event = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zM329 305c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-95 95-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L329 305z"/></svg>'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers :[HomeComponent],

})


export class AppComponent {
  title = 'frontSportSocial';
  dark: boolean = false;
  classToggled: boolean = false;
  vrai = 1;
  status = 'Enable';
  userInfo : any;


  constructor(public authService: AuthService, private http: HttpClient, public darkThem : DarkThemeService , private route: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIconLiteral('friend', sanitizer.bypassSecurityTrustHtml(friend));
    iconRegistry.addSvgIconLiteral('shop', sanitizer.bypassSecurityTrustHtml(shop));
    iconRegistry.addSvgIconLiteral('event', sanitizer.bypassSecurityTrustHtml(event));
  };

  ngOnInit () {
    this.infoUser();
    if (localStorage.getItem('active') !== null)
    this.classToggled = !this.classToggled;
    if (this.classToggled == true) {
    this.darkThem.darkTheme();
    this.dark = true;
  }
  if (this.classToggled == false) {
    this.darkThem.darkThemeOff();
  }
  }

  darkTheme() {
    localStorage.setItem('active', '1');
    if (localStorage.getItem('active') !== null) {
    this.classToggled = !this.classToggled;
    if (this.classToggled == true) {
      this.darkThem.darkTheme();
      window.location.reload()
      }
    if (this.classToggled == false) {
      this.darkThem.darkThemeOff();
      localStorage.removeItem('active');
      window.location.reload()
     }
    }
  }

  darkMode() {
    if (this.dark == false) {
      this.dark = true;
    } else {
      this.dark = false;
    }
  }

  goToMap() {;
    this.route.navigateByUrl('map');
  }

  goToFriend() {;
    this.route.navigateByUrl('friend');
  }

  goToEvent() {;
    this.route.navigateByUrl('event');
  }

  goToSchedule() {;
    this.route.navigateByUrl('schedule');
  }

  goToClub() {;
    this.route.navigateByUrl('club');
  }
  
  goToHome() {;
    this.route.navigateByUrl('home');
  }

  goToShopAvatar() {
    localStorage.removeItem('coach');
    localStorage.removeItem('tokens');
    localStorage.setItem('avatar', '1');
    this.route.navigateByUrl('shop');
  }

  goToShopTokens() {
    localStorage.removeItem('avatar');
    localStorage.removeItem('coach');
    localStorage.setItem('tokens', '1');
    this.route.navigateByUrl('shop');
  }

  goToShopCoach() {
    localStorage.removeItem('avatar');
    localStorage.removeItem('tokens');
    localStorage.setItem('coach', '1');
    this.route.navigateByUrl('shop');
  }

  goToProfil() {
    this.route.navigateByUrl('profil');
  }

  infoUser() {
    this.http.get('http://localhost:8300/user/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.userInfo = data;
      },
      error: (err) => { console.log(err); }
    });
  }
  

}
