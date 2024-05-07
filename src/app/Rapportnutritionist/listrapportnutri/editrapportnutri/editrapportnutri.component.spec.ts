import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditrapportnutriComponent } from './editrapportnutri.component';

describe('EditrapportnutriComponent', () => {
  let component: EditrapportnutriComponent;
  let fixture: ComponentFixture<EditrapportnutriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditrapportnutriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditrapportnutriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
