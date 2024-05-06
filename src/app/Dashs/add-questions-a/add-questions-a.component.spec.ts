import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionsAComponent } from './add-questions-a.component';

describe('AddQuestionsAComponent', () => {
  let component: AddQuestionsAComponent;
  let fixture: ComponentFixture<AddQuestionsAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuestionsAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuestionsAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
