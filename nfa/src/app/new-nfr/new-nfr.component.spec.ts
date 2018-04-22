import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNfrComponent } from './new-nfr.component';

describe('NewNfrComponent', () => {
  let component: NewNfrComponent;
  let fixture: ComponentFixture<NewNfrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNfrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNfrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
