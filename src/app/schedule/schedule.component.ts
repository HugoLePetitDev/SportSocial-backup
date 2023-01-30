import { AppComponent } from '../app.component';
import { Component, OnInit } from '@angular/core';

import { CalendarView } from 'angular-calendar';
import { CalendarEvent } from 'angular-calendar';
import { endOfDay, startOfDay } from 'date-fns';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DarkThemeService } from '../services/dark-theme.service';
import { NewActivityComponent } from '../new-activity/new-activity.component';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],


})


export class ScheduleComponent implements OnInit {

  schedules: any;
  start: any;
  end: any;
  title: any;
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  classToggled = this.dark.classToggled;

  constructor(private http: HttpClient, public authService: AuthService, private route: Router, private dialog: MatDialog, private appComponent: AppComponent, public dark: DarkThemeService) { }

  ngOnInit(): void {
    this.listSchedule();
    this.setView(this.CalendarView.Day);
    localStorage.removeItem('dateEnd');
    localStorage.removeItem('dateStart');
    localStorage.removeItem('descActivity');
    localStorage.removeItem('nameActivity');
    localStorage.removeItem('idActivity');
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      title: "Aujourd'hui",
    }
  ]


  listSchedule() {
    this.http.get('http://localhost:8300/activity/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.schedules = data;
        this.schedules.map((a: { activity: any }) => this.events.push({ start: new Date(a.activity.dateStart), end: new Date(a.activity.dateEnd), title: a.activity.nameActivity }));
        this.setView(CalendarView.Month);
      },
      error: (err) => { console.log(err); }
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {}

  openNewActivity() {
    const dialogRef = this.dialog.open(NewActivityComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    })
  }


}
