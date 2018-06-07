import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnnfaformComponent } from './ennfaform.component';

describe('EnnfaformComponent', () => {
  let component: EnnfaformComponent;
  let fixture: ComponentFixture<EnnfaformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnnfaformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnnfaformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
