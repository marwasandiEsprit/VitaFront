import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminshowrapportpsyComponent } from './adminshowrapportpsy.component';

describe('AdminshowrapportpsyComponent', () => {
  let component: AdminshowrapportpsyComponent;
  let fixture: ComponentFixture<AdminshowrapportpsyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminshowrapportpsyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminshowrapportpsyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
