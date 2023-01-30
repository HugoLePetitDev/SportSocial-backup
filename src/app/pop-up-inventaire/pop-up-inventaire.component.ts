import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DarkThemeService } from '../services/dark-theme.service';

@Component({
  selector: 'app-pop-up-inventaire',
  templateUrl: './pop-up-inventaire.component.html',
  styleUrls: ['./pop-up-inventaire.component.css']
})



export class PopUpInventaireComponent implements OnInit {
  constructor(private http: HttpClient, private route: Router, public authService: AuthService, private dialog: MatDialog, public dark: DarkThemeService) { }

  images: any;
  changement: any;
  classToggled = this.dark.classToggled;

  ngOnInit() {
    this.getInventaire()
  }

  getInventaire() {
    this.http.get("http://localhost:8300/user/inventaire/" + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.images = data
        console.log(data)
      },
      error: (err) => { console.log(err); }
    })
  }

  changePP(val: any) {
    this.http.get("http://localhost:8300/user/changement/" + this.authService.getUserConnect().idUser + "/" + val).subscribe({
      next: (data) => {
        this.changement = data
        console.log(this.changement)
        this.dialog.closeAll();
      },
      error: (err) => { console.log(err); }
    })
  }

  goToProfile() {
    this.dialog.closeAll();

  }

  goToShop() {
    this.route.navigateByUrl('shop');
    this.dialog.closeAll();
  }

}
