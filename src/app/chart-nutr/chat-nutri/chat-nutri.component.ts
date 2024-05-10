import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ChatService } from 'src/app/_services/ChatService';
import { PlatService } from 'src/app/_services/PlatService';
import { UserService } from 'src/app/_services/user.service';

import { User } from 'src/app/models/user';

@Component({
  selector: 'app-chat-nutri',
  templateUrl: './chat-nutri.component.html',
  styleUrls: ['./chat-nutri.component.css']
})
export class ChatNutriComponent implements OnInit,AfterViewInit{
  status = false;
  users: User[] = [];
  platesData: { [key: string]: number } = {}; // Define platesData with string keys for usernames
  clientsData: { [key: string]: number } = {};
  constructor(
    private userService: UserService,
    private platService: PlatService,
    private chatService: ChatService
  ) { }
  
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart: Chart | undefined;
  @ViewChild('chartnut') chartnut!: ElementRef;
  chartNut: Chart | undefined;

  ngOnInit(): void {
    this.getAllUsers();
   
    this.getPlatesPerUser(); // Call the method to get plates data
    this.getClientsPerNutritionist();
  }

  ngAfterViewInit() {
    if (this.chartCanvas.nativeElement) {
      this.renderChart();
    } else {
      console.error('Canvas element not found');
    }
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.renderChart();
      },
      (error: any) => {
        console.error('Failed to retrieve users:', error);
      }
    );
  }

  getPlatesPerUser(): void {
    this.platService.getPlatesPerUser().subscribe(
      (data: { [key: string]: number }) => { // Change the type to use string keys
        this.platesData = data;
        // Filter out users with zero plates
        this.users = this.users.filter(user => this.platesData[user.id!.toString()] > 0);
        this.renderChart();
      },
      (error: any) => {
        console.error('Failed to retrieve plates per user:', error);
      }
    );
  }
  getClientsPerNutritionist(): void {
    this.chatService.countClientsPerNutritionist().subscribe(
      (data: { [key: string]: number }) => {
        this.clientsData = data;
        console.log(this.clientsData); // Check if data is received correctly
        this.renderClientsChart(); // Call your chart rendering function here
      },
      (error: any) => {
        console.error('Failed to retrieve clients per nutritionist:', error);
      }
    );
  }
  
  
  
  
  
  
  renderChart(): void {
    // Check if there's an existing chart instance
    if (this.chart) {
      // Destroy the existing chart instance
      this.chart.destroy();
    }
  
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not found');
      return;
    }
  
    // Prepare labels and data from platesData
    const userIds = Object.keys(this.platesData);
    const data = Object.values(this.platesData);
  
    // Map user IDs to usernames for users who have created plates
    const labels: string[] = [];
    const validUserIds: string[] = [];
    userIds.forEach(userId => {
      if (this.platesData[userId] > 0) {
        const user = this.users.find(u => u.id === +userId); // Find the user by ID
        if (user) {
          labels.push(user.username!); // Push username to labels array
          validUserIds.push(userId);
        }
      }
    });
  
    // Filter out users who didn't create plates
    const validData = data.filter((_, index) => validUserIds.includes(userIds[index]));
  
    // Create chart
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Plates per Nutritionniste',
          data: validData,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Plates'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Nutritionniste name'
            }
          }
        }
      }
    });
  }



  renderClientsChart(): void {
    const labels: string[] = [];
    const dataPoints: number[] = [];
    
    // Convert the map-like object to an array of entries
    const entries = Object.entries(this.clientsData);
    
    // Iterate over the entries array
    entries.forEach(([userId, count]) => {
      const user = this.users.find(u => u.id!.toString() === userId); // Find the user by ID
      if (user) {
        labels.push(user.username!);
        dataPoints.push(count);
      }
    });
    
    const ctx = this.chartnut.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not found');
      return;
    }
    
    // Check if there's an existing chart instance
    if (this.chartNut) {
      // Destroy the existing chart instance
      this.chartNut.destroy();
    }
    
    this.chartNut = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Clients per Nutritionist',
          data: dataPoints,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Clients'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Nutritionist Name'
            }
          }
        }
      }
    });
  }

}
