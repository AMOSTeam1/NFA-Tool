import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpackageComponent } from './newpackage.component';

describe('NewpackageComponent', () => {
  let component: NewpackageComponent;
  let fixture: ComponentFixture<NewpackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewpackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
