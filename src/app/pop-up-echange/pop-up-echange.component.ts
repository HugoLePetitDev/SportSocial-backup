import { Component, OnInit } from '@angular/core';
import { CoachService } from '../services/coach.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { DarkThemeService } from '../services/dark-theme.service';

@Component({
  selector: 'app-pop-up-echange',
  templateUrl: './pop-up-echange.component.html',
  styleUrls: ['./pop-up-echange.component.css']
})

export class PopUpEchangeComponent implements OnInit {

  constructor(private CoachService: CoachService, private http: HttpClient, public authService: AuthService, public dark: DarkThemeService) { };

  ngOnInit(): void {

  }

  coach = this.CoachService.getCoachToSee();
  coachId = this.coach.idUser;
  echange: any;
  msg: any;
  classToggled = this.dark.classToggled;

  echangeToken(val: any) {
    this.http.get("http://localhost:8300/boutique/echangeToken/" + this.authService.getUserConnect().idUser + "/" + this.coachId + "/" + val).subscribe({
      next: (data) => {
        this.echange = data
        if (this.echange == true) {
          this.msg = "Les tokens ont bien été envoyés à"
        } else {
          this.msg = "Échange refusé."
        }
      },
      error: (err) => { console.log(err); }
    });
  }

}
