import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubComponent } from './club/club.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { EventComponent } from './event/event.component';
import { FriendComponent } from './friend/friend.component';
import { HomeComponent } from './home/home.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { MapComponent } from './map/map.component';
import { ProfilComponent } from './profil/profil.component';
import { RankingComponent } from './ranking/ranking.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ShopComponent } from './shop/shop.component';
import { ClubPageComponent } from './club-page/club-page.component';

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'home', component: HomeComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'friend', component: FriendComponent },
  { path: 'map', component: MapComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'club', component: ClubComponent },
  { path: 'event', component: EventComponent },
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
  { path: 'clubPage', component: ClubPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
