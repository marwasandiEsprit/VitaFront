import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNutrionistesComponent } from './list-nutrionistes.component';

describe('ListNutrionistesComponent', () => {
  let component: ListNutrionistesComponent;
  let fixture: ComponentFixture<ListNutrionistesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNutrionistesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNutrionistesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
