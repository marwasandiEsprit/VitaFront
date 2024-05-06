import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatspsyconsultationComponent } from './statspsyconsultation.component';

describe('StatspsyconsultationComponent', () => {
  let component: StatspsyconsultationComponent;
  let fixture: ComponentFixture<StatspsyconsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatspsyconsultationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatspsyconsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
