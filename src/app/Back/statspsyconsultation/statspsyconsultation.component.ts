import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Subject, takeUntil } from 'rxjs';
import { PsychiatristService } from 'src/app/services/psychiatrist.service';

@Component({
  selector: 'app-statspsyconsultation',
  templateUrl: './statspsyconsultation.component.html',
  styleUrls: ['./statspsyconsultation.component.css']
})
export class StatspsyconsultationComponent {
  @ViewChild('consultationChart') consultationChartRef!: ElementRef;
  consultationsPerPsychiatrist: Map<string, number> = new Map();
  private destroy$: Subject<void> = new Subject<void>();
  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }

  constructor(private psychiatristService: PsychiatristService) {}

  ngOnInit(): void {
    this.getConsultationsPerPsychiatrist();
  }

  getConsultationsPerPsychiatrist(): void {
    this.psychiatristService.getTotalConsultationsPerPsychiatrist()
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        // Transform the object into a Map
        this.consultationsPerPsychiatrist = new Map(Object.entries(response));
        this.renderBarChart();
      });
  }
  

  renderBarChart(): void {
    const ctx = this.consultationChartRef.nativeElement.getContext('2d');
    const labels = Array.from(this.consultationsPerPsychiatrist.keys());
    const data = Array.from(this.consultationsPerPsychiatrist.values());
  
    if (this.consultationsPerPsychiatrist.size > 0) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Total Consultations',
              data: data,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Consultations'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Psychiatrist'
              }
            }
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
