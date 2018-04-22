import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewnfaComponent } from './newnfa.component';

describe('NewnfaComponent', () => {
  let component: NewnfaComponent;
  let fixture: ComponentFixture<NewnfaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewnfaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewnfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
