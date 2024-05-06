import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PsychiatristService } from 'src/app/services/psychiatrist.service';
import Chart from 'chart.js/auto';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-statspsy',
  templateUrl: './statspsy.component.html',
  styleUrls: ['./statspsy.component.css']
})
export class StatspsyComponent {
  @ViewChild('consultationChart') consultationChartRef!: ElementRef;
  consultationsPerClient: Map<string, number> = new Map();
  psychologueId!: number;
  selectedYear!: number;
  selectedMonth!: string;
  status = false;
  psychiatristId!: number; // Declare psychiatristId property
  addToggle() {
    this.status = !this.status;       
  }
  private destroy$: Subject<void> = new Subject<void>();
  constructor(
    private route: ActivatedRoute,
    private consultationService: PsychiatristService,
    private router: Router,
    private  storageService :StorageService
  ) {}
  ngOnInit(): void {
    // Extract route parameters
    if (this.storageService.isLoggedIn()) {
      const user = this.storageService.getUser(); // Get user information from session
      this.psychiatristId = user?.id; // Assign user's ID to psychiatristId
      this.getConsultations(); // Call getConsultations after assigning psychiatristId
    }
  }

  getConsultations(): void {
    this.consultationService
      .getConsultationCountPerClient(this.psychiatristId)
      .subscribe(response => {
        this.consultationsPerClient = new Map(Object.entries(response));
        this.renderBarChart();
      });
  }

  renderBarChart(): void {
    const ctx = this.consultationChartRef.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Array.from(this.consultationsPerClient.keys()),
        datasets: [
          {
            label: 'Number of Consultations',
            data: Array.from(this.consultationsPerClient.values()),
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
            max: 10
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
