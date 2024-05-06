import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrapportpsyComponent } from './addrapportpsy.component';

describe('AddrapportpsyComponent', () => {
  let component: AddrapportpsyComponent;
  let fixture: ComponentFixture<AddrapportpsyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrapportpsyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddrapportpsyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
