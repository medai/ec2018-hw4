import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertInformComponent } from './alert-inform.component';

describe('AlertInformComponent', () => {
  let component: AlertInformComponent;
  let fixture: ComponentFixture<AlertInformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertInformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertInformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
