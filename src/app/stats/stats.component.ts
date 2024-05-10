

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import Chart from 'chart.js/auto';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PsychiatristService } from '../services/psychiatrist.service';
interface RouteParams {
  year: number;
  month: string;
}
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  status: boolean = false;
  @ViewChild('consultationChart') consultationChartRef!: ElementRef;
  consultationsPerDay: Map<string, number> = new Map();
  year!: number;
  month!: string;
  consultationChart!: Chart;
  psychologueId!: number;
  selectedYear!: number;
  selectedMonth!: string;
  availableYears!: number[];
  availableMonths!: string[];

  addToggle()
  {
    this.status = !this.status;       
  }
  private destroy$: Subject<void> = new Subject<void>();
  constructor(
    private route: ActivatedRoute,
    private consultationService: PsychiatristService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Extract route parameters
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.psychologueId = +params['id']; // Convert to number if needed
      this.selectedYear = +params['year']; // Convert to number if needed
      this.selectedMonth  = params['month'];
      this.getConsultations();
    });
    this.availableYears = [2023, 2024, 2025]; // Example array of available years
    this.availableMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  }

  getConsultations(): void {
    this.consultationService
      .getConsultationsPerDayInMonth(this.psychologueId, this.selectedYear, this.selectedMonth)
      .subscribe(response => {
        // Extract the keys and values from the response object
        const keys = Object.keys(response);
        const values: number[] = Object.values(response);
  
        // Create a new Map from the extracted keys and values
        this.consultationsPerDay = new Map(keys.map((key, index) => [key, values[index]]));
  
        this.renderBarChart();
      });
  }
  renderBarChart(): void {
    if (this.consultationChart) {
      // Destroy the existing chart instance
      this.consultationChart.destroy();
    }
    const ctx = this.consultationChartRef.nativeElement.getContext('2d');
    this.consultationChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Array.from(this.consultationsPerDay.keys()),
        datasets: [
          {
            label: 'Number of Consultations',
            data: Array.from(this.consultationsPerDay.values()),
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderColor: 'rgba(255, 255, 255, 1)',
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
  onYearChange(): void {
    // Get the current URL parameters
    const currentParams = this.route.snapshot.params as RouteParams; // Cast to RouteParams type

    // Update the query parameters with the selected year
    const updatedParams: RouteParams = {
      ...currentParams,
      year: this.selectedYear // Set the year to the selected value
    };

    // Navigate to the updated route with the new parameters
    this.router.navigate(['stats', this.psychologueId, updatedParams.year, updatedParams.month], {
      queryParamsHandling: 'merge', // Merge with existing query parameters
    });
  }


  
  onMonthChange(): void {
    // Get the current URL parameters
    const currentParams = this.route.snapshot.params;

    // Update the query parameters with the selected month
    const updatedParams = {
      ...currentParams,
      month: this.selectedMonth.toLowerCase() // Ensure month name is lowercase to match the desired URL format
    };

    // Navigate to the updated route with the new parameters
    this.router.navigate(['stats', this.psychologueId, this.selectedYear, updatedParams.month], {
      queryParamsHandling: 'merge', // Merge with existing query parameters
    });
}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
