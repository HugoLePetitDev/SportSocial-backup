import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { DarkThemeService } from '../services/dark-theme.service';

@Component({
  selector: 'app-new-club',
  templateUrl: './new-club.component.html',
  styleUrls: ['./new-club.component.css']
})
export class NewClubComponent implements OnInit {

  constructor(private http: HttpClient, public authService: AuthService, public dialogRef: MatDialogRef<NewClubComponent>, public dark: DarkThemeService) { }

  sports: any;
  classToggled = this.dark.classToggled;

  ngOnInit(): void {
    this.listSport();
    console.log(this.sports);
  }

  createClub(val: any) {
    this.http.post('http://localhost:8300/club/' + this.authService.getUserConnect().idUser, val).subscribe({
      next: (data) => {

      },
      error: (err) => { console.log(err) },

    })
  }

  listSport() {
    this.http.get('http://localhost:8300/sport').subscribe({
      next: (data) => {
        this.sports = data;
        console.log(this.sports)
      },
      error: (err) => { console.log(err); }
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


}
