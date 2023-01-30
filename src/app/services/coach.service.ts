import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  constructor() { }

  setCoachToSee(val: any) {
    localStorage.setItem('coachToSee', JSON.stringify(val));
  }

  getCoachToSee() {
    let coachProfil: any = localStorage.getItem('coachToSee');
    return JSON.parse(coachProfil);
  }
}
