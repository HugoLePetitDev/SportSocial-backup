import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Route, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-schedule',
  templateUrl: './pop-up-schedule.component.html',
  styleUrls: ['./pop-up-schedule.component.css']
})
export class PopUpScheduleComponent {

  constructor(private http: HttpClient, private route: Router, private authService: AuthService, private dialog: MatDialog) { }


  scheduleUser: any;

  addSchedule(val: any) {
    this.http.post('http://localhost:8300/schedule/', val).subscribe({
      next: (data) => {
        this.scheduleUser = data;
        this.route.navigateByUrl('schedule');
      },
      error: (err) => { console.log(err) },
    })
  }

  goToSchedule() {
    this.dialog.closeAll()
  }
}
