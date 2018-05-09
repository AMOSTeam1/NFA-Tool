import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewprojectComponent } from './newproject.component';
import { EditableTableModule } from '../editable-table/editable-table.module';

describe('NewprojectComponent', () => {
  let component: NewprojectComponent;
  let fixture: ComponentFixture<NewprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewprojectComponent ],
      imports: [EditableTableModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
