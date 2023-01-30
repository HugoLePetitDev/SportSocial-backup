import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpProfilComponent } from './pop-up-profil.component';

describe('PopUpProfilComponent', () => {
  let component: PopUpProfilComponent;
  let fixture: ComponentFixture<PopUpProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
