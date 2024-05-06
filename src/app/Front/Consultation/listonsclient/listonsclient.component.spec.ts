import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListonsclientComponent } from './listonsclient.component';

describe('ListonsclientComponent', () => {
  let component: ListonsclientComponent;
  let fixture: ComponentFixture<ListonsclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListonsclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListonsclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
