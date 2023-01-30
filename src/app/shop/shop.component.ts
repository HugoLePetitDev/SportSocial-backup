import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';
import { DarkThemeService } from '../services/dark-theme.service';
import { PopUpCoachComponent } from'../pop-up-coach/pop-up-coach.component';
import { CoachService } from '../services/coach.service';
import { PopUpEchangeComponent } from '../pop-up-echange/pop-up-echange.component';




@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})


export class ShopComponent implements OnInit {

  visibleCoach : boolean = false;
  visibleAvatar : boolean = false;
  visibleTokens : boolean = false;
  coachs: any;
  sports : any;
  avatars: any;
  msgErr = '';
  achat = 'Acheter';
  transaction: any;
  transactio: any;
  userInfo: any;
  classToggled = this.dark.classToggled;

  constructor(private http: HttpClient, public authService: AuthService,private dialog: MatDialog, private route: Router, private coachService: CoachService, private appComponent : AppComponent, public dark : DarkThemeService) { }

  ngOnInit(): void {
    if (localStorage.getItem('avatar') !== null){
      this.visibleAvatar = true;
      this.visibleCoach = false;
      this.visibleTokens = false;
    }
    if (localStorage.getItem('coach') !== null){
      this.visibleAvatar = false;
      this.visibleCoach = true;
      this.visibleTokens = false;
    }
    if (localStorage.getItem('tokens') !== null){
      this.visibleAvatar = false;
      this.visibleCoach = false;
      this.visibleTokens = true;
    }
    this.listCoachs();
    this.listAvatars();
    this.infoUser();
    this.verifAvatarAchete(this.avatars);    
  }

  showHideCoach() {
    if (this.visibleCoach == false) {
      this.visibleCoach = true;
      localStorage.removeItem('avatar');
      localStorage.removeItem('tokens');
      localStorage.setItem('coach', '1');
      this.visibleTokens = false;
      this.visibleAvatar = false;
    } else {
      this.visibleCoach = true;
    }
  }

  showHideAvatar() {
    if (this.visibleAvatar == false) {
      this.visibleAvatar = true;
      localStorage.removeItem('coach');
      localStorage.removeItem('tokens');
      localStorage.setItem('avatar', '1');
      this.visibleTokens = false;
      this.visibleCoach = false;
    } else {
      this.visibleAvatar = true;
    }
  }

  showHideTokens() {
    if (this.visibleTokens == false) {
      localStorage.removeItem('coach');
      localStorage.removeItem('avatar');
      localStorage.setItem('tokens', '1');
      this.visibleTokens = true;
      this.visibleCoach = false;
      this.visibleAvatar = false;
    } else {
      this.visibleTokens = true;
    }
  }

  listCoachs() {
    this.http.get('http://localhost:8300/coach').subscribe({
      next: (data) => {
        this.coachs = data
      },
      error: (err) => { console.log(err); }
    });
  }

  listCoachsBySport(val: any) {
    this.http.get('http://localhost:8300/coach/' + val).subscribe({
      next: (data) => {
        this.coachs = data;
      },
      error: (err) => { console.log(err); }
    })
  }

  listSportOfCoach(val : any){
    this.http.get('http://localhost:8300/coach/sports/' + val).subscribe({
      next: (data) => {
        this.sports = data,
        val.stopPropagation()
      },
      error : (err) => {console.log(err);}
    })
  }

  listAvatars() {
    this.http.get('http://localhost:8300/avatar').subscribe({
      next: (data) => {
        this.avatars = data
      },
      error: (err) => { console.log(err); }
    });
  }

  openProfilCoach(val: any) {
    this.coachService.setCoachToSee(val);
    const dialogRef = this.dialog.open(PopUpCoachComponent, {
      width: '1000px'
    })
    dialogRef.afterClosed().subscribe(() => { //Pour lancer des fonctions lorsqu'on ferme le popup
      this.ngOnInit(); //pour reload les cards event => affiche le nouvel event sans reload page
    });
  }
  
  listAvatarDescription(val: any) {
    this.http.get('http://localhost:8300/avatar/' + val).subscribe({
      next: (data) => {
        this.avatars = data
      },
      error: (err) => { console.log(err); }
    })
  }

  achatTokenEuro(val: any) {
    this.http.get('http://localhost:8300/boutique/achat/euro/' + this.authService.getUserConnect().idUser + '/' + val).subscribe({
      next: (data) => {
        this.transaction = data
      },
      error: (err) => { console.log(err); }
    })

  }

  achatToken(val: any) {
    this.http.get('http://localhost:8300/boutique/achatToken/' + this.authService.getUserConnect().idUser + '/' + val).subscribe({
      next: (data) => {
        this.transaction = data
      },
      error: (err) => { console.log(err); }
    })

  }

  achatProduit(val: any) {
    this.http.get(`http://localhost:8300/boutique/achat/${this.authService.getUserConnect().idUser}/${val}`).subscribe({
      next: (data) => {
        this.transactio = data
        if (this.transactio.validation == true) {
          this.msgErr = "La transaction est bien effectuée"
          this.achat = "fas fa-check"
          this.ngOnInit();
        } else {
          this.msgErr = "Transaction refusée"
        }
      },
      error: (err) => { console.log(err); }
    })
  }

  infoUser() {
    this.http.get('http://localhost:8300/user/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.userInfo = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  verifAvatarAchete(avatar: any) {
    let exist = false;
    this.userInfo.inventaire.forEach((a: any) => {
      if (avatar.imageProduit.idImage == a) {
        exist = true;
      }
    });
    return exist;
  }

  goToFriends() {
    this.route.navigateByUrl('friend');
  }

  openEchange(val: any) {
    this.coachService.setCoachToSee(val);
    const dialogRef = this.dialog.open(PopUpEchangeComponent, {
      width: '800px',
      height: '400px'
    })
    dialogRef.afterClosed().subscribe(() => { //Pour lancer des fonctions lorsqu'on ferme le popup
      this.ngOnInit(); 
    });
  }
  

}
