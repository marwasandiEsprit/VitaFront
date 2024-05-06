import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdaterapportpsyComponent } from './updaterapportpsy.component';

describe('UpdaterapportpsyComponent', () => {
  let component: UpdaterapportpsyComponent;
  let fixture: ComponentFixture<UpdaterapportpsyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdaterapportpsyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdaterapportpsyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
