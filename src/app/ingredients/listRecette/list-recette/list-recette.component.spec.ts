import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecetteComponent } from './list-recette.component';

describe('ListRecetteComponent', () => {
  let component: ListRecetteComponent;
  let fixture: ComponentFixture<ListRecetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRecetteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
