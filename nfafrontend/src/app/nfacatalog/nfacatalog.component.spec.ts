import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NfacatalogComponent } from './nfacatalog.component';

describe('NfacatalogComponent', () => {
  let component: NfacatalogComponent;
  let fixture: ComponentFixture<NfacatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NfacatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NfacatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
