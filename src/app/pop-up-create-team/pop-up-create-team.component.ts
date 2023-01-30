import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pop-up-create-team',
  templateUrl: './pop-up-create-team.component.html',
  styleUrls: ['./pop-up-create-team.component.css']
})
export class PopUpCreateTeamComponent {

  constructor(private http: HttpClient, private route: Router, public dialogRef: MatDialogRef<PopUpCreateTeamComponent>, public authService: AuthService ) { }

    infosTeam : any;
    searchText : any;
    title : any;

    onNoClick(): void {
      this.dialogRef.close();
    }

  createTeam(val: NgForm) {
    let title = { title: val.value.title };
    if (val.value.title .trim()){
    this.http.post('http://localhost:8300/team/create/' + this.authService.getUserConnect().idUser, title).subscribe({
      next: (data) => { 
        this.infosTeam = data;
        val.reset();
      },
      error: (err) => { console.log(err) },
    });
  }
  }

}
