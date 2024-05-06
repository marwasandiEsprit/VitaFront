import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeQuestionComponent } from './edite-question.component';

describe('EditeQuestionComponent', () => {
  let component: EditeQuestionComponent;
  let fixture: ComponentFixture<EditeQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditeQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditeQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
