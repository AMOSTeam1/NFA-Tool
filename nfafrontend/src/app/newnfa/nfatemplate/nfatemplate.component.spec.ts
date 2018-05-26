import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NfatemplateComponent } from './nfatemplate.component';

describe('NfatemplateComponent', () => {
  let component: NfatemplateComponent;
  let fixture: ComponentFixture<NfatemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NfatemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NfatemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
