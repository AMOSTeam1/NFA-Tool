import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NfrPackagesComponent } from './nfr-packages.component';

describe('NfrPackagesComponent', () => {
  let component: NfrPackagesComponent;
  let fixture: ComponentFixture<NfrPackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NfrPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NfrPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
