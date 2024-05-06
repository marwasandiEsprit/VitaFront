import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(private renderer: Renderer2) {}

  scrollToServices(): void {
    const serviceElement = document.getElementById('services');
    if (serviceElement) {
      serviceElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToService(): void {
    const contactElement = document.getElementById('contacts');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
