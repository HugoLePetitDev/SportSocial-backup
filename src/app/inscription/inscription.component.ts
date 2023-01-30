import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DarkThemeService } from '../services/dark-theme.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {

  user: any;
  isChecked = true;
  show: boolean = false;
  visiblePassword = false;  
  classToggled = this.dark.classToggled;

  constructor(private http: HttpClient, private route: Router, private authService: AuthService, public dark : DarkThemeService) { }

  ngOnInit(): void {
    this.authService.logout();
    this.route.navigateByUrl('inscription');

  }

  password() {
    this.show = !this.show;
    if (this.visiblePassword == false) {
      this.visiblePassword = true;
    } else {
      this.visiblePassword = false;
    }
}

  goToConnexion() {
    this.route.navigateByUrl('connexion');
  }

  inscription(val: any) {
    console.log(val)
    if (this.isChecked == true) {
      val.coachUser = true;
      this.http.post('http://localhost:8300/user/save', val).subscribe({
        next: (data) => {
          this.user = data;
          console.log(this.user);
          this.route.navigateByUrl('connexion');
        },
        error: (err) => { console.log(err) },

      })

    } else {
      val.coachUser = false;
      this.http.post('http://localhost:8300/user/save', val).subscribe({
        next: (data) => {
          this.user = data;
          console.log(this.user);
          this.route.navigateByUrl('connexion');
        },
        error: (err) => { console.log(err) },

      })
    }
  }




}