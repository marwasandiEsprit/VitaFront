import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculCaloriesComponent } from './calcul-calories.component';

describe('CalculCaloriesComponent', () => {
  let component: CalculCaloriesComponent;
  let fixture: ComponentFixture<CalculCaloriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculCaloriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculCaloriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
