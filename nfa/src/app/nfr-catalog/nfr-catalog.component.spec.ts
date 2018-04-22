import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NfrCatalogComponent } from './nfr-catalog.component';

describe('NfrCatalogComponent', () => {
  let component: NfrCatalogComponent;
  let fixture: ComponentFixture<NfrCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NfrCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NfrCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
