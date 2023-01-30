import { AnimateTimings } from '@angular/animations';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { isThisWeek } from 'date-fns';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';
import { DarkThemeService } from '../services/dark-theme.service';
import { PopUpCreateTeamComponent } from '../pop-up-create-team/pop-up-create-team.component';
import { findIndex, last } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const userOption = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 256c-70.7 0-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128s-57.3 128-128 128zm-45.7 48h91.4c11.8 0 23.4 1.2 34.5 3.3c-2.1 18.5 7.4 35.6 21.8 44.8c-16.6 10.6-26.7 31.6-20 53.3c4 12.9 9.4 25.5 16.4 37.6s15.2 23.1 24.4 33c15.7 16.9 39.6 18.4 57.2 8.7v.9c0 9.2 2.7 18.5 7.9 26.3H29.7C13.3 512 0 498.7 0 482.3C0 383.8 79.8 304 178.3 304zM436 218.2c0-7 4.5-13.3 11.3-14.8c10.5-2.4 21.5-3.7 32.7-3.7s22.2 1.3 32.7 3.7c6.8 1.5 11.3 7.8 11.3 14.8v30.6c7.9 3.4 15.4 7.7 22.3 12.8l24.9-14.3c6.1-3.5 13.7-2.7 18.5 2.4c7.6 8.1 14.3 17.2 20.1 27.2s10.3 20.4 13.5 31c2.1 6.7-1.1 13.7-7.2 17.2l-25 14.4c.4 4 .7 8.1 .7 12.3s-.2 8.2-.7 12.3l25 14.4c6.1 3.5 9.2 10.5 7.2 17.2c-3.3 10.6-7.8 21-13.5 31s-12.5 19.1-20.1 27.2c-4.8 5.1-12.5 5.9-18.5 2.4l-24.9-14.3c-6.9 5.1-14.3 9.4-22.3 12.8l0 30.6c0 7-4.5 13.3-11.3 14.8c-10.5 2.4-21.5 3.7-32.7 3.7s-22.2-1.3-32.7-3.7c-6.8-1.5-11.3-7.8-11.3-14.8V454.8c-8-3.4-15.6-7.7-22.5-12.9l-24.7 14.3c-6.1 3.5-13.7 2.7-18.5-2.4c-7.6-8.1-14.3-17.2-20.1-27.2s-10.3-20.4-13.5-31c-2.1-6.7 1.1-13.7 7.2-17.2l24.8-14.3c-.4-4.1-.7-8.2-.7-12.4s.2-8.3 .7-12.4L343.8 325c-6.1-3.5-9.2-10.5-7.2-17.2c3.3-10.6 7.7-21 13.5-31s12.5-19.1 20.1-27.2c4.8-5.1 12.4-5.9 18.5-2.4l24.8 14.3c6.9-5.1 14.5-9.4 22.5-12.9V218.2zm92.1 133.5c0-26.5-21.5-48-48.1-48s-48.1 21.5-48.1 48s21.5 48 48.1 48s48.1-21.5 48.1-48z"/></svg>';
const addFriendIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css'],
})


export class FriendComponent implements OnInit {


  sendmessages: any;
  sendmessagesasc: any;
  receivedmessagesasc: any;
  visibleMessage = false;
  visibleTeam = false;
  visibleOption = false;
  visibleTeamTitle = false;
  visibleTeamMember = false;
  visibleAddTeamMember = false;
  notfriends: any;
  friends: any;
  frienship: any;
  name: any;
  mess: any;
  login: any;
  login2: any;
  login3: any;
  login4: any;
  login5: any;
  login6: any;
  ami: any;
  user: any;
  filterUser: any;
  filterFriend: any;
  filterTeam: any;
  userInfo: any;
  deletefriend: any;
  classToggled = this.dark.classToggled;
  team: any;
  teammessages: any;
  teammember: any;
  nonteammember: any;
  member: any;
  lastmsg: any;
  x: any;
  listLastMsg: Array<any> = [];
  lastteammsg: any;
  y: any;
  listLastTeamMsg: Array<any> = [];
  listTest: Array<any> = [];
  listTestB: Array<any> = [];
  i : any;
  lastIdMessage : any ;
  listLastIdMessage : Array<any> = [];
  infoMessage : any;


  constructor(private http: HttpClient, public authService: AuthService, private route: Router, private dialog: MatDialog, private appComponent: AppComponent, public dark: DarkThemeService,  iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,) { 
    iconRegistry.addSvgIconLiteral('userOption', sanitizer.bypassSecurityTrustHtml(userOption));
    iconRegistry.addSvgIconLiteral('add-friend', sanitizer.bypassSecurityTrustHtml(addFriendIcon));
  };

  ngOnInit(): void {
    this.listSendMessages();
    this.listFriends();
    this.listNotFriendsDelete();
    this.listNonFriend();
    this.listNotFriends();
    this.listTeam();
    this.infoUser();
    if (this.login4 != null) { this.listTeamMember(); }
    if (this.login4 != null) { this.listNonTeamMember(); }
    if (this.login != null) {
      this.listSendAndReceivedMessagesAsc();
    }
    if (this.login4 != null) {
      this.listTeamMessages();
    }
  }

  listSendMessages() {
    this.http.get('http://localhost:8300/message/me/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => { this.sendmessages = data },
      error: (err) => { console.log(err) }
    });
  }

  displayFriendConversation(val: any) {
    this.login = val;
    this.visibleTeam = false;
    this.http.get('http://localhost:8300/messagetrue/me/' + this.authService.getUserConnect().idUser + '/' + this.login.idUser + '/'  + this.authService.getUserConnect().idUser + '/combine').subscribe({
      next: (data) => {
      },
      error: (err) => { console.log(err) }
    });
    if (this.visibleMessage == false) {
      this.visibleMessage = true;
    } else {
    }
    if (val != null) {
      this.listSendAndReceivedMessagesAsc();
    } else {
      this.visibleMessage = true;
    }
  }

  displayTeamConversation(val: any) {
    this.login4 = val;
    this.visibleMessage = false;
    this.visibleOption = false;
    this.visibleTeamTitle = false;
    this.visibleTeamMember = false;
    this.visibleAddTeamMember = false;
    this.sendmessagesasc = null;
    this.http.get('http://localhost:8300/team/truemessage/' + this.login4.idTeam + '/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
      },
      error: (err) => { console.log(err) }
    });
    if (this.visibleTeam == false) {
      this.visibleTeam = true;
    } else {
    }
    if (val != null) {
      this.listTeamMessages();
    } else {
      this.visibleTeam = true;
    }
  }

  messageOption() {
    if (this.visibleOption == false) {
      this.visibleOption = true;
    } else {
      this.visibleOption = false;
      this.visibleTeamTitle = false;
      this.visibleTeamMember = false;
      this.visibleAddTeamMember = false;
    }
  }

  newTeamTitle() {
    if (this.visibleTeamTitle == false) {
      this.visibleTeamTitle = true;
      this.visibleTeamMember = false;
      this.visibleAddTeamMember = false;
    } else {
      this.visibleTeamTitle = false;
    }
  }

  seeTeamMember() {
    this.member = this.login4;
    this.listTeamMember();
    if (this.visibleTeamMember == false) {
      this.visibleTeamMember = true;
      this.visibleTeamTitle = false;
      this.visibleAddTeamMember = false;
    } else {
      this.visibleTeamMember = false;
    }
  }

  addTeamMember() {
    this.listNonTeamMember();
    if (this.visibleAddTeamMember == false) {
      this.visibleAddTeamMember = true;
      this.visibleTeamTitle = false;
      this.visibleTeamMember = false;
    } else {
      this.visibleAddTeamMember = false;
    }
  }

  listNonFriend() {
    this.http.get('http://localhost:8300/nonfriend/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.user = data
      },
      error: (err) => { console.log(err) }
    })
  }

  listSendAndReceivedMessagesAsc() {
    this.http.get('http://localhost:8300/message/me/' + this.authService.getUserConnect().idUser + '/' + this.login.idUser + '/combine').subscribe({
      next: (data) => {
        this.sendmessagesasc = data
      },
      error: (err) => { console.log(err) }
    });
  }

  listFriends() {
    this.listLastMsg = [];
    this.http.get('http://localhost:8300/friend/receiver/' + this.authService.getUserConnect().idUser).subscribe({ // Affiche la liste de Friend
      next: (data) => {
        this.friends = data
        for (let index in this.friends) {
          if (this.listLastMsg != null) {
            this.listLastMsg = [];
          }
          this.http.get('http://localhost:8300/messagelast/me/' + this.authService.getUserConnect().idUser + '/' + this.friends[index].idUser + '/combine').subscribe({
            next: (data) => {
              this.lastmsg = data,
              this.listLastMsg.push(this.lastmsg[0])
            }
          })
        }
      },
      error: (err) => { console.log(err); }
    });
  }

  listNotFriends() {
    this.http.get('http://localhost:8300/notfriend/receiver/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => { this.notfriends = data      
      },
      error: (err) => { console.log(err); }
    });
  }

  listNotFriendsDelete() {
    this.http.get('http://localhost:8300/notfriend/receiverdelete/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => { this.deletefriend = data },
      error: (err) => { console.log(err); }
    });
  }

  listTeam() {
    if (this.listLastIdMessage != null) {
      this.listLastIdMessage = [];
    }
    this.http.get('http://localhost:8300/team/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.team = data
        for (let index in this.team) {
          this.listTest = this.team[index].idTeam
          let commentData = {} as any;
          commentData.idTeam = this.listTest;
          this.listLastIdMessage.push(commentData);
          if (this.listLastTeamMsg != null) {
            this.listLastTeamMsg = [];
          }
          this.http.get('http://localhost:8300/team/lastmessage/'  + this.team[index].idTeam ).subscribe({
            next: (data) => {
              this.lastteammsg = "";
              this.lastteammsg = data,
              commentData.lastMsg = this.lastteammsg[0];
              this.listLastTeamMsg.push(commentData)
            }
          })
        }
      },
      error: (err) => { console.log(err) }
    })
  }

  listTeamMessages() {
    this.http.get('http://localhost:8300/team/message/' + this.login4.idTeam).subscribe({
      next: (data) => {
        this.teammessages = data
      },
      error: (err) => { console.log(err) }
    });

  }

  listTeamMember() {
    this.http.get('http://localhost:8300/team/member/' + this.login4.idTeam).subscribe({
      next: (data) => {
        this.teammember = data
      },
      error: (err) => { console.log(err) }
    });

  }

  listNonTeamMember() {
    this.http.get('http://localhost:8300/team/nonmember/' + this.login4.idTeam).subscribe({
      next: (data) => {
        this.nonteammember = data
      },
      error: (err) => { console.log(err) }
    });
  }


  sendMess(val: NgForm) {
    let messag = { contentMessage: val.value.message };
    let messagerie = { message: messag };
    if ( val.value.message.trim()) {
    this.http.post('http://localhost:8300/message/envoyer/' + this.login.idUser + '/' + this.authService.getUserConnect().idUser, messagerie).subscribe({
      next: (data) => {
        this.mess = data;
        val.reset();
        this.ngOnInit()
      },
      error: (err) => { console.log(err) },
    })
  }

  }

  sendTeamMess(val: NgForm) {
    let messag = { contentMessage: val.value.message };
    this.http.post('http://localhost:8300/team/envoyer/' + this.login4.idTeam + '/' + this.authService.getUserConnect().idUser, messag).subscribe({
      next: (data) => {
        this.mess = data;
        val.reset();
        this.ngOnInit()
      },
      error: (err) => { console.log(err) },
    })
  }

  renameTeam(val: NgForm) {
    let title = { title: val.value.message };
    if (val.value.message.trim()){
    this.http.post('http://localhost:8300/team/rename/' + this.login4.idTeam, title).subscribe({
      next: (data) => {
        this.mess = data;
        val.reset();
        this.ngOnInit()
      },
      error: (err) => { console.log(err) },
    })
  }
  }

  deleteFrienship(val: any) {
    this.login2 = val;
    this.http.get('http://localhost:8300/select/' + this.authService.getUserConnect().idUser + '/' + this.login2.idUser, val).subscribe({
      next: (data) => {
        this.ami = data;
        this.http.delete('http://localhost:8300/friend/refuse/' + this.ami.idFriend, val).subscribe({
          next: (data) => {
            this.ngOnInit();
          },
        })
      },
      error: (err) => { console.log(err); },
    })
  }

  acceptFrienship(val: any) {
    this.login2 = val;
    this.http.get('http://localhost:8300/select/' + this.authService.getUserConnect().idUser + '/' + this.login2.idUser, val).subscribe({
      next: (data) => {
        this.ami = data;
        this.ami.accept = true;
        this.http.patch('http://localhost:8300/friend/accept/' + this.ami.idFriend, this.ami).subscribe({
          next: (data) => {
            this.ngOnInit();
          },
        })
      },
      error: (err) => { console.log(err); },
    })
  }

  FilterUser(val: any) {
    this.filterUser = val;
    this.http.get('http://localhost:8300/nonfriend/search/' + val + '/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.user = data;
      }
    })
  }

  FilterFriend(val: any) {
    this.filterFriend = val;
    this.http.get('http://localhost:8300/friend/search/' + val + '/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.friends = data;
      }
    })
  }

  FilterTeam(val: any) {
    this.filterTeam = val;
    this.http.get('http://localhost:8300/team/search/' + val + '/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.team = data;
      }
    })
  }

  addFriend(val: any) {
    this.login3 = val
    this.http.post('http://localhost:8300/friend/' + this.authService.getUserConnect().idUser, this.login3).subscribe({
      next: (data) => {
        this.ngOnInit();
      }
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

  quitTeam() {
    this.http.delete('http://localhost:8300/team/quit/' + this.login4.idTeam + '/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => { console.log(err); },
    })
    this.ngOnInit();
    this.visibleMessage = false;
    this.visibleTeam = false;
  }

  deleteTeamMember(val: any) {
    this.login5 = val;
    this.http.delete('http://localhost:8300/team/quit/' + this.login4.idTeam + '/' + this.login5.idUser).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => { console.log(err); },
    })
    this.ngOnInit();

  }

  addTeamMembers(val: any) {
    this.login6 = val;
    this.http.post('http://localhost:8300/team/addmember/' + this.login4.idTeam + '/' + this.login6.idUser, val).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => { console.log(err); },
    })
    this.ngOnInit();
  }

  openNewTeamModal() {
    const dialogRef = this.dialog.open(PopUpCreateTeamComponent);
    dialogRef.afterClosed().subscribe(() => { //Pour lancer des fonctions lorsqu'on ferme le popup
      this.ngOnInit(); //pour reload les cards event => affiche le nouvel event sans reload page
    });

  }

  deleteTeam() {
    this.http.delete('http://localhost:8300/team/delete/' + this.login4.idTeam).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => { console.log(err); },
    })
    this.ngOnInit();
    this.visibleMessage = false;
    this.visibleTeam = false;
  }

  deleteMessage(val : any) {
    this.infoMessage = val;
    this.http.delete('http://localhost:8300/message/delete/' + this.authService.getUserConnect().idUser + '/' + this.infoMessage.message.idMessage).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => { console.log(err); },
    })
  }

  deleteTeamMessage(val : any) {
    this.infoMessage = val;
    this.http.delete('http://localhost:8300/team/message/delete/' + this.authService.getUserConnect().idUser + '/' + this.infoMessage.idMessage  + '/' + this.login4.idTeam).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => { console.log(err); },
    })
  }

}


