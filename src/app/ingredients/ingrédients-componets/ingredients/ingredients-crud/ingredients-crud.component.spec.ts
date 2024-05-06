import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsCrudComponent } from './ingredients-crud.component';

describe('IngredientsCrudComponent', () => {
  let component: IngredientsCrudComponent;
  let fixture: ComponentFixture<IngredientsCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientsCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
