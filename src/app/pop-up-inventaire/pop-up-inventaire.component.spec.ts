import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpInventaireComponent } from './pop-up-inventaire.component';

describe('PopUpInventaireComponent', () => {
  let component: PopUpInventaireComponent;
  let fixture: ComponentFixture<PopUpInventaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpInventaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
