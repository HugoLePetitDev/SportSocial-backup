import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCoachComponent } from './pop-up-coach.component';

describe('PopUpCoachComponent', () => {
  let component: PopUpCoachComponent;
  let fixture: ComponentFixture<PopUpCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpCoachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
