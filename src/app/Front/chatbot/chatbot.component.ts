import { Component } from '@angular/core';
import { PsychiatristService } from 'src/app/services/psychiatrist.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  constructor() { }

  ngOnInit(): void {
    // FAQ TOGGLES
    const toggles = document.querySelectorAll('.faq-toggle');
    toggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const parentNode = toggle.parentNode;
        if (parentNode instanceof HTMLElement) {
          parentNode.classList.toggle('active');
        }
      });
    });

    // SOCIAL PANEL JS
    const floatingBtn = document.querySelector('.floating-btn') as HTMLElement;
    const closeBtn = document.querySelector('.close-btn') as HTMLElement;
    const socialPanelContainer = document.querySelector('.social-panel-container') as HTMLElement;

    floatingBtn.addEventListener('click', () => {
      socialPanelContainer.classList.toggle('visible');
    });

    closeBtn.addEventListener('click', () => {
      socialPanelContainer.classList.remove('visible');
    });
  }
  
}
