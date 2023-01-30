import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { ClubsService } from '../services/clubs.service';
import { DarkThemeService } from '../services/dark-theme.service';

@Component({
  selector: 'app-pop-up-add-post',
  templateUrl: './pop-up-add-post.component.html',
  styleUrls: ['./pop-up-add-post.component.css']
})
export class PopUpAddPostComponent {


  constructor(public dialogRef: MatDialogRef<PopUpAddPostComponent>, private http: HttpClient, public authService: AuthService, public clubService: ClubsService , public dark: DarkThemeService) { }

  idClub = this.clubService.getClubToSee().idClub;
  classToggled = this.dark.classToggled;

  createPost(val: any) {
    this.http.post('http://localhost:8300/club/posts/add/' + this.authService.getUserConnect().idUser + '/' + this.idClub, val).subscribe({
      next: (data) => {

      },
      error: (err) => { console.log(err) },

    })
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
