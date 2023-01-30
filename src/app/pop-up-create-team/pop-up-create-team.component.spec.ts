import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCreateTeamComponent } from './pop-up-create-team.component';

describe('PopUpCreateTeamComponent', () => {
  let component: PopUpCreateTeamComponent;
  let fixture: ComponentFixture<PopUpCreateTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpCreateTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpCreateTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
