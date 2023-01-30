import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
export class DarkThemeService {
  
  classToggled : boolean = false;
  
  constructor(private route: Router) { }

  public darkTheme() {
    this.classToggled = true; 
  }

  public darkThemeOff() {
  this.classToggled = false; 
  }

}
