import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlatDialogComponent } from './add-plat-dialog.component';

describe('AddPlatDialogComponent', () => {
  let component: AddPlatDialogComponent;
  let fixture: ComponentFixture<AddPlatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlatDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPlatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
