import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersstatisticComponent } from './usersstatistic.component';

describe('UsersstatisticComponent', () => {
  let component: UsersstatisticComponent;
  let fixture: ComponentFixture<UsersstatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersstatisticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersstatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
