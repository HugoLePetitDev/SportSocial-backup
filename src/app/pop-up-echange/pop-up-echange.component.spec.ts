import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpEchangeComponent } from './pop-up-echange.component';

describe('PopUpEchangeComponent', () => {
  let component: PopUpEchangeComponent;
  let fixture: ComponentFixture<PopUpEchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpEchangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpEchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
