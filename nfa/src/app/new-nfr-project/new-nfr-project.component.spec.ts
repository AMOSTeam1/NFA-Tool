import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNfrProjectComponent } from './new-nfr-project.component';

describe('NewNfrProjectComponent', () => {
  let component: NewNfrProjectComponent;
  let fixture: ComponentFixture<NewNfrProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNfrProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNfrProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
