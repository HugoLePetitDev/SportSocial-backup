import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.css']
})
export class NewActivityComponent {

  constructor(private http: HttpClient, private route: Router, public dialogRef: MatDialogRef<NewActivityComponent>, public authService: AuthService) { }

  sports: any;
  nameActivity: any = localStorage.getItem('nameActivity');
  dateEnd: any = localStorage.getItem('dateEnd');
  dateStart: any = localStorage.getItem('dateStart');
  descActivity: any = localStorage.getItem('descActivity');
  id: any = localStorage.getItem('idActivity');
  modify: boolean = true;
  isChecked = true;


  ngOnInit(): void {
    this.listSport();

  }

  createActivity(val: any) {
    if (this.isChecked == true) {
      val.publicActivity = true;
      this.http.post('http://localhost:8300/schedule/' + this.authService.getUserConnect().idUser, val).subscribe({
        next: (data) => {
        },
        error: (err) => { console.log(err) },
      });
    }
    if (this.isChecked == false) {
      val.publicActivity = false;
      this.http.post('http://localhost:8300/schedule/' + this.authService.getUserConnect().idUser, val).subscribe({
        next: (data) => {
        },
        error: (err) => { console.log(err) },
      });
    }
  }

  modifyActivity(val: any) {
    if (this.isChecked == true) {
      val.publicActivity = true;
      this.http.post('http://localhost:8300/schedule/modify/' + this.authService.getUserConnect().idUser + '/' + this.id, val).subscribe({
        next: (data) => {
          localStorage.removeItem('dateEnd');
          localStorage.removeItem('dateStart');
          localStorage.removeItem('descActivity');
          localStorage.removeItem('nameActivity');
          localStorage.removeItem('idActivity');
        },
        error: (err) => { console.log(err) },
      });
    }
    if (this.isChecked == false) {
      val.publicActivity = false;
      this.http.post('http://localhost:8300/schedule/modify/' + this.authService.getUserConnect().idUser + '/' + this.id, val).subscribe({
        next: (data) => {
          localStorage.removeItem('dateEnd');
          localStorage.removeItem('dateStart');
          localStorage.removeItem('descActivity');
          localStorage.removeItem('nameActivity');
          localStorage.removeItem('idActivity');
        },
        error: (err) => { console.log(err) },
      });
    }
  }


  listSport() {
    this.http.get('http://localhost:8300/sport').subscribe({
      next: (data) => { this.sports = data },
      error: (err) => { console.log(err); }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
    localStorage.removeItem('dateEnd');
    localStorage.removeItem('dateStart');
    localStorage.removeItem('descActivity');
    localStorage.removeItem('nameActivity');
    localStorage.removeItem('idActivity');
  }

}
