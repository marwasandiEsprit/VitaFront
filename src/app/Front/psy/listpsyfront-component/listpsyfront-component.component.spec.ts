import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpsyfrontComponentComponent } from './listpsyfront-component.component';

describe('ListpsyfrontComponentComponent', () => {
  let component: ListpsyfrontComponentComponent;
  let fixture: ComponentFixture<ListpsyfrontComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpsyfrontComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListpsyfrontComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
