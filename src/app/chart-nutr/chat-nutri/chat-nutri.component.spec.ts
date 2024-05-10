import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatNutriComponent } from './chat-nutri.component';

describe('ChatNutriComponent', () => {
  let component: ChatNutriComponent;
  let fixture: ComponentFixture<ChatNutriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatNutriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatNutriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
