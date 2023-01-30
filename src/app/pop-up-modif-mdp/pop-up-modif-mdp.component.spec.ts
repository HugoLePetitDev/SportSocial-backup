import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpModifMdpComponent } from './pop-up-modif-mdp.component';

describe('PopUpModifMdpComponent', () => {
  let component: PopUpModifMdpComponent;
  let fixture: ComponentFixture<PopUpModifMdpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpModifMdpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpModifMdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
