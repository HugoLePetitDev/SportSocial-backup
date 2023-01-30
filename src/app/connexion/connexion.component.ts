import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';
import { DarkThemeService } from '../services/dark-theme.service';



@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  user: any;
  msgErr = '';
  show: boolean = false;
  visiblePassword = false;  
  classToggled = this.dark.classToggled;


  constructor(private http: HttpClient, private route: Router, private authService: AuthService, private appComponent : AppComponent, public dark : DarkThemeService) { }

  ngOnInit(): void {
    this.authService.logout();

  }

  password() {
    this.show = !this.show;
    if (this.visiblePassword == false) {
      this.visiblePassword = true;
    } else {
      this.visiblePassword = false;
    }
}

  connexion(val: any) {
    this.http.post('http://localhost:8300/user', val).subscribe({
      next: (data) => {
        this.user = data;
        if (this.user != null) {
          this.authService.setUserSession(this.user);
          this.route.navigateByUrl('home');
        } else {
          this.msgErr = 'Identifiant ou mot de passe incorrect';
        }
      },
      error: (err) => { console.log(err) },

    })
  }

  goToInscription() {
    this.route.navigateByUrl('inscription');
  }

}
