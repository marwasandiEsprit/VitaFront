import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListrapportnutriComponent } from './listrapportnutri.component';

describe('ListrapportnutriComponent', () => {
  let component: ListrapportnutriComponent;
  let fixture: ComponentFixture<ListrapportnutriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListrapportnutriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListrapportnutriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
