import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListrapportpsyComponent } from './listrapportpsy.component';

describe('ListrapportpsyComponent', () => {
  let component: ListrapportpsyComponent;
  let fixture: ComponentFixture<ListrapportpsyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListrapportpsyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListrapportpsyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
