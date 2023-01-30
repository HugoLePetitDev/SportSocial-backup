import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DarkThemeService } from '../services/dark-theme.service';

@Component({
  selector: 'app-pop-up-profil',
  templateUrl: './pop-up-profil.component.html',
  styleUrls: ['./pop-up-profil.component.css']
})
export class PopUpProfilComponent {

  constructor(private http: HttpClient, private route: Router, public authService: AuthService, private dialog: MatDialog, public dark: DarkThemeService) { }

  user: any;
  isChecked = true;
  errorMsg = "";
  classToggled = this.dark.classToggled;

  modifInfosUser(val: any) {
    if(val.lastNameUser != '' && val.firstNameUser != '' && val.birthDateUser != '' && val.loginUser != ''){
      console.log(val)
    if (this.isChecked == true) {
      val.coachUser = true;
      console.log(val.coachUser)
      this.http.put('http://localhost:8300/user/' + this.authService.getUserConnect().idUser, val).subscribe({
        next: (data) => {
          this.user = data;
          this.goToProfile();
        },
        error: (err) => { console.log(err) },

      })
    }
    else {
      val.coachUser = false;
      this.http.put('http://localhost:8300/user/' + this.authService.getUserConnect().idUser, val).subscribe({
        next: (data) => {
          this.user = data;
          this.goToProfile();
        },
        error: (err) => { console.log(err) },

      })
    }
    }
    else {
      this.errorMsg = "Vous ne pouvez pas saisir des informations vides ! ";
    }

  }




  goToProfile() {
    this.dialog.closeAll();
    
    
    
  }


}
