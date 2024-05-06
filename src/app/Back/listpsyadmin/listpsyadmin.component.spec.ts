import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpsyadminComponent } from './listpsyadmin.component';

describe('ListpsyadminComponent', () => {
  let component: ListpsyadminComponent;
  let fixture: ComponentFixture<ListpsyadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpsyadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListpsyadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
