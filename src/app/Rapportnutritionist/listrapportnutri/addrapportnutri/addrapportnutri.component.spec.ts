import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrapportnutriComponent } from './addrapportnutri.component';

describe('AddrapportnutriComponent', () => {
  let component: AddrapportnutriComponent;
  let fixture: ComponentFixture<AddrapportnutriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrapportnutriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddrapportnutriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
