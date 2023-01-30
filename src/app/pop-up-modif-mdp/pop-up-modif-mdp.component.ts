import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewEventComponent } from '../new-event/new-event.component';
import { AuthService } from '../services/auth.service';
import { DarkThemeService } from '../services/dark-theme.service';

@Component({
  selector: 'app-pop-up-modif-mdp',
  templateUrl: './pop-up-modif-mdp.component.html',
  styleUrls: ['./pop-up-modif-mdp.component.css']
})
export class PopUpModifMdpComponent {

  user: any;
  msgErr = '';
  u: any;
  ok = false;
  classToggled = this.dark.classToggled;

  constructor(private http: HttpClient, private route: Router, private dialog: MatDialog, public authService: AuthService,  public dialogRef: MatDialogRef<NewEventComponent>, public dark: DarkThemeService) { }

  modifMdp(val: any) {
    console.log(val)

    this.http.get('http://localhost:8300/user/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.u = data;

        if (val.passwordUser != '' && val.OldpasswordUser == this.u.passwordUser) {

          this.http.put('http://localhost:8300/user/password/' + this.authService.getUserConnect().idUser, val).subscribe({
            next: (data) => {
              this.user = data;
              this.dialog.closeAll()

            },
            error: (err) => { console.log(err) },

          })
        } else {
          this.msgErr = 'Ancien mdp non valide ou nouveau mdp vide';
        }
      },
      error: (err) => { console.log(err) },

    })





  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
