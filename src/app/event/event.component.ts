import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewEventComponent } from '../new-event/new-event.component';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';
import { DarkThemeService } from '../services/dark-theme.service';




@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})

export class EventComponent implements OnInit {

  events: any;
  event: any;
  sports: any;
  friends: any;
  usersParticipating: any;
  dummy: any;
  userParticipateEvent = false;
  classToggled = this.dark.classToggled;
  filterUser : any;
  visibleSearch : Boolean = false;
  visibleFilter : Boolean = false;

  constructor(private http: HttpClient, private route: Router, private dialog: MatDialog, public authService: AuthService, private cd: ChangeDetectorRef, private appComponent : AppComponent, public dark : DarkThemeService) { }

  ngOnInit(): void {
    this.listEventToCome();
    this.listSport();
    if (!this.authService.isConnected()) {
      this.route.navigateByUrl('connexion')
    }
    this.listFriends()
  }

  listEventToCome() {
    this.http.get('http://localhost:8300/event/tocome').subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  listSport() {
    this.http.get('http://localhost:8300/sport').subscribe({
      next: (data) => { this.sports = data },
      error: (err) => { console.log(err); }
    });
  }

  openNewEventModal() {
    const dialogRef = this.dialog.open(NewEventComponent);
    dialogRef.afterClosed().subscribe(() => { //Pour lancer des fonctions lorsqu'on ferme le popup
      this.ngOnInit(); //pour reload les cards event => affiche le nouvel event sans reload page
    });

  }

  addEventToUser(idEvent: bigint) {
    this.http.patch('http://localhost:8300/event/participer/' + this.authService.getUserConnect().idUser + '/' + idEvent, null).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => { console.log(err) },
    });

  }

  removeUserFromEvent(idEvent: bigint) {
    this.http.patch('http://localhost:8300/event/desister/' + this.authService.getUserConnect().idUser + '/' + idEvent, null).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => { console.log(err) },
    });

  }

  listFriends() {
    this.http.get('http://localhost:8300/friend/receiver/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => { this.friends = data },
      error: (err) => { console.log(err); }
    });
  }

  getUsersOfEvent(idEvent: bigint) {
    this.http.get('user/participateEvent/' + idEvent).subscribe({
      next: (data) => { this.usersParticipating = data },
      error: (err) => { console.log(err); }
    })
  }

  verifUser(event: any) {
    let exist = false;
    event.participants.forEach((p: any) => {
      if (p.idUser == this.authService.getUserConnect().idUser) {
        exist = true;
      }
    });
    return exist;
  }

  FilterEvent(val: any) {
    this.filterUser = val;
    this.http.get('http://localhost:8300/event/search/' + val ).subscribe({
      next: (data) => {
        this.events = data;
      }
    })
  }
  
  visibleSearchEvent(){
    if (this.visibleSearch == false) {
    this.visibleFilter = false;
    this.visibleSearch = true;
  }
  }

  visibleFilterEvent(){
    if (this.visibleFilter == false) {
      this.visibleFilter = true;
      this.visibleSearch = false;
    }
  }


}
