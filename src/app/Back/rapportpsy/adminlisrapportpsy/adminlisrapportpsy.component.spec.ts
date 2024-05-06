import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminlisrapportpsyComponent } from './adminlisrapportpsy.component';

describe('AdminlisrapportpsyComponent', () => {
  let component: AdminlisrapportpsyComponent;
  let fixture: ComponentFixture<AdminlisrapportpsyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminlisrapportpsyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminlisrapportpsyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
