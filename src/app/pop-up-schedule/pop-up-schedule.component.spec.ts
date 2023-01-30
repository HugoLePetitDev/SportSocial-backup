import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpScheduleComponent } from './pop-up-schedule.component';

describe('PopUpScheduleComponent', () => {
  let component: PopUpScheduleComponent;
  let fixture: ComponentFixture<PopUpScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
