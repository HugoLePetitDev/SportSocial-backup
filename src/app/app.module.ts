import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { HomeComponent } from './home/home.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { FriendComponent } from './friend/friend.component';
import { MapComponent } from './map/map.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ProfilComponent } from './profil/profil.component';
import { ShopComponent } from './shop/shop.component';
import { RankingComponent } from './ranking/ranking.component';
import { ClubComponent } from './club/club.component';
import { EventComponent } from './event/event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { PopUpProfilComponent } from './pop-up-profil/pop-up-profil.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PopUpScheduleComponent } from './pop-up-schedule/pop-up-schedule.component';

import { NewEventComponent } from './new-event/new-event.component';
import { PopUpModifMdpComponent } from './pop-up-modif-mdp/pop-up-modif-mdp.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PopUpInventaireComponent } from './pop-up-inventaire/pop-up-inventaire.component';
import { NewClubComponent } from './new-club/new-club.component';

import { PopUpCreateTeamComponent } from './pop-up-create-team/pop-up-create-team.component';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { PopUpQuitClubComponent } from './pop-up-quit-club/pop-up-quit-club.component';
import { ClubPageComponent } from './club-page/club-page.component';
import { PopUpCoachComponent } from './pop-up-coach/pop-up-coach.component';
import { PopUpEchangeComponent } from './pop-up-echange/pop-up-echange.component';
import { from } from 'rxjs';
import { NewActivityComponent } from './new-activity/new-activity.component';
import { PopUpAddPostComponent } from './pop-up-add-post/pop-up-add-post.component';



@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    HomeComponent,
    InscriptionComponent,
    FriendComponent,
    MapComponent,
    ScheduleComponent,
    ProfilComponent,
    ShopComponent,
    RankingComponent,
    ClubComponent,
    EventComponent,
    PopUpProfilComponent,
    PopUpScheduleComponent,
    NewEventComponent,
    PopUpModifMdpComponent,
    PopUpInventaireComponent,
    NewClubComponent,
    PopUpCreateTeamComponent,
    PopUpQuitClubComponent,
    ClubPageComponent,
    PopUpCoachComponent,
    PopUpEchangeComponent,
    NewActivityComponent,
    PopUpAddPostComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    ScrollingModule,
    MatSlideToggleModule,
    MatInputModule,
    MatMenuModule,
    MatSliderModule,

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
