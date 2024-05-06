import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotQAComponent } from './chatbot-qa.component';

describe('ChatbotQAComponent', () => {
  let component: ChatbotQAComponent;
  let fixture: ComponentFixture<ChatbotQAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatbotQAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatbotQAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
