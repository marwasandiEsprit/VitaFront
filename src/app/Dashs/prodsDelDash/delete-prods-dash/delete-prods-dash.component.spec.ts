import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProdsDashComponent } from './delete-prods-dash.component';

describe('DeleteProdsDashComponent', () => {
  let component: DeleteProdsDashComponent;
  let fixture: ComponentFixture<DeleteProdsDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProdsDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProdsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
