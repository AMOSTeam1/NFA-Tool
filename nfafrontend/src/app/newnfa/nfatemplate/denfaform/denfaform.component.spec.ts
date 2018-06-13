import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenfaformComponent } from './denfaform.component';

describe('DenfaformComponent', () => {
  let component: DenfaformComponent;
  let fixture: ComponentFixture<DenfaformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenfaformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenfaformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
