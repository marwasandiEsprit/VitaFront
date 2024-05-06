import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDataServiceComponent } from './food-data-service.component';

describe('FoodDataServiceComponent', () => {
  let component: FoodDataServiceComponent;
  let fixture: ComponentFixture<FoodDataServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodDataServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodDataServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
