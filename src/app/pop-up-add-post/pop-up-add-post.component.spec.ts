import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpAddPostComponent } from './pop-up-add-post.component';

describe('PopUpAddPostComponent', () => {
  let component: PopUpAddPostComponent;
  let fixture: ComponentFixture<PopUpAddPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpAddPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpAddPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
