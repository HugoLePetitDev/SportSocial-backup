import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewClubComponent } from '../new-club/new-club.component';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';
import { DarkThemeService } from '../services/dark-theme.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { PopUpQuitClubComponent } from '../pop-up-quit-club/pop-up-quit-club.component';
import { ClubsService } from '../services/clubs.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  sports: any;
  myClubs: any;
  otherClubs: any;
  classToggled = this.dark.classToggled;
  clubToJoin: any;
  filterOtherClub : any;
  filterBySport : any;
  myFriends : any;
  idClub : any;
  visibleSearch = false;
  visibleFilter = false;
  listClubFriend : Array<any> = [];
  listClubFriendB : Array<any> = [];

  constructor(private http: HttpClient, private clubService: ClubsService, private authService: AuthService, private route: Router, public dialog: MatDialog, private appComponent: AppComponent, public dark: DarkThemeService) { }

  ngOnInit(): void {
    this.listSport();
    this.listMyClubs();
    this.listOtherClubs()
    if (!this.authService.isConnected()) {
      this.route.navigateByUrl('connexion')
    }
  }

  listSport() {
    this.http.get('http://localhost:8300/sport').subscribe({
      next: (data) => { this.sports = data },
      error: (err) => { console.log(err); }
    });

  }

  listMyClubs() {
    this.http.get('http://localhost:8300/mesClubs/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.myClubs = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  listOtherClubs() {
    this.listClubFriend = [];
    this.http.get('http://localhost:8300/autresClubs/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.otherClubs = data;
        for (let index in this.otherClubs) {
          let commentData = {} as any;
          commentData.idClub = this.otherClubs[index].idClub
          if (this.listClubFriend != null) {
            this.listClubFriend = [];
          }
          this.http.get('http://localhost:8300/club/amis/' + this.authService.getUserConnect().idUser + '/' + this.otherClubs[index].idClub).subscribe({
            next: (data) => {
              this.myFriends = data;
              if (this.listClubFriendB != null) {
                this.listClubFriendB = [];
              }
              for (let index in this.myFriends) {
                let commentDataB = {} as any;
                commentDataB = this.myFriends[index];
                this.listClubFriendB.push(commentDataB)
                if (Number(index) == this.myFriends.length - 1){
                  commentData.friend = this.listClubFriendB
                  this.listClubFriend.push(commentData);
                }
            }            
            },
            error: (err) => { console.log(err); }
        });
      }
      },
      error: (err) => { console.log(err); }
    });
  }

  openNewClubModal() {
    const dialogRef = this.dialog.open(NewClubComponent);
    dialogRef.afterClosed().subscribe(() => { //Pour lancer des fonctions lorsqu'on ferme le popup
      this.ngOnInit(); //pour reload les Clubs
    });
  }

  joinClub(val: any) {
    this.clubToJoin = val;
    this.http.patch('http://localhost:8300/club/rejoindre/' + this.authService.getUserConnect().idUser + '/' + this.clubToJoin.idClub, null).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => { console.log(err); }
    })
  }

  openDialog(val: any) {
    this.clubService.setClubToQuit(val);
    const dialogRef = this.dialog.open(PopUpQuitClubComponent, { restoreFocus: false });
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openClubPage(val: any) {
    this.clubService.setClubToSee(val);
    this.route.navigateByUrl('clubPage');

  }

  filterClub(val: any) {
    this.filterOtherClub = val;
    this.http.get('http://localhost:8300/club/search/' + val + '/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.otherClubs = data;
      }
    })
  }

  filterClubBySport(val: any) {
    this.filterBySport = val;
    this.http.get('http://localhost:8300/club/filter/' + this.authService.getUserConnect().idUser +'/' + val.sportEvent.nameSport).subscribe({
      next: (data) => {
        this.otherClubs = data;
      }
    })
  }

  goToFriends() {
    this.route.navigateByUrl('friend');
  }

  visibleSearchClub(){
    if (this.visibleSearch == false){
      this.visibleSearch = true
      this.visibleFilter = false
    }
  }

  visibleFilterClub(){
    if (this.visibleFilter == false){
      this.visibleSearch = false
      this.visibleFilter = true
    }
  }

}