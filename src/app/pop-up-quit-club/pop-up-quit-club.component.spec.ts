import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpQuitClubComponent } from './pop-up-quit-club.component';

describe('PopUpQuitClubComponent', () => {
  let component: PopUpQuitClubComponent;
  let fixture: ComponentFixture<PopUpQuitClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpQuitClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpQuitClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
