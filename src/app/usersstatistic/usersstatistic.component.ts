import {Component, OnInit} from '@angular/core';
import {UserService} from "../_services/user.service";
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-usersstatistic',
  templateUrl: './usersstatistic.component.html',
  styleUrls: ['./usersstatistic.component.css']
})
export class UsersstatisticComponent implements OnInit{
  status = false;
  sortOption: string = 'name';
  addToggle()
  {
    this.status = !this.status;
  }

  users: any[] = [];

  selectedMethod: string = '';
  usersWithPurchasedProducts!: Array<{ userId: number, count: number }>;
  usersWithPaidProductsAmount!: Array<{ userId: number, amount: number }>;


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users: any[]) => {
        this.users = users;
        this.renderScores();
      },
      error: err => {
        console.error('Error fetching users:', err);
      }
    });
  }

  findUsersWithPurchasedProducts(): void {
    this.userService.findUsersWithPurchasedProducts()
      .subscribe(results => {
        this.usersWithPurchasedProducts = results;
        console.log(results) ;
        console.log(this.usersWithPurchasedProducts);
        this.renderChartUsersWithPurchasedProducts();
      });
  }

  findUsersWithPaidProductsAmount(): void {
    this.userService.findUsersWithPaidProductsAmount()
      .subscribe(results => {
        console.log(results) ;
        this.usersWithPaidProductsAmount = results;
        console.log(this.usersWithPaidProductsAmount);
        this.renderChartUsersWithPaidProductsAmount();
        this.renderChartUsersWithPurchasedProductsAndPaidAmount();

      });
  }


  selectMethod(method: string): void {
    this.selectedMethod = method;
    switch (method) {
      case 'UsersWithPurchasedProducts':
        this.findUsersWithPurchasedProducts();
        break;
      case 'UsersWithPaidProductsAmount':
        this.findUsersWithPaidProductsAmount();
        break;
    }
  }

  renderScores() {
    const nonAdminUsers = this.users.filter(user => user.roles.some((role: { name: string; }) => role.name === 'ROLE_CLIENT'));
    let chartOptions = {
      series: [{
        name: 'Score',
        data: nonAdminUsers.map(user => user.score)
      }],
      chart: {
        type: 'bar',
        height: 250,
        toolbar: {
          show: false
        }
      },
      title: {
        text: 'User Scores',
        align: 'center',
        style: {
          fontSize: '24px',
          color: '#263238'
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          barHeight: '60%',
          colors: {
            ranges: [{
              from: 0,
              to: 20,
              color: '#3f51b5'
            }]
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: nonAdminUsers.map(user => user.username),
        labels: {
          style: {
            colors: '#263238',
            fontSize: '14px'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#263238',
            fontSize: '14px'
          }
        }
      },
      grid: {
        borderColor: '#e0e0e0',
        strokeDashArray: 5,
        yaxis: {
          lines: {
            show: true
          }
        }
      }
    };

    const chartElement = document.querySelector('#chartScores');
    if (chartElement) {
      const chart = new ApexCharts(chartElement as HTMLElement, chartOptions);
      chart.render();
    }
  }

  renderChartUsersWithPurchasedProducts(): void {
    const chartOptions = {
      series: this.usersWithPurchasedProducts.map(item => Object.values(item)[0]),
      labels: this.usersWithPurchasedProducts.map(item => Object.keys(item)[0].toString()),
      chart: {
        type: 'polarArea',
        height: 350
      },
      title: {
        text: 'Purchased Products by Users',
        align: 'left'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    const chartElement = document.querySelector('#chartUsersWithPurchasedProducts');
    if (chartElement) {
      const chart = new ApexCharts(chartElement as HTMLElement, chartOptions);
      chart.render();
    }
  }

  renderChartUsersWithPaidProductsAmount(): void {
    if (this.usersWithPaidProductsAmount.length === 0) {
      return;
    }

    const thirdDimensionData = [10, 20]; // Replace this with your actual data

    const chartOptions = {
      series: this.usersWithPaidProductsAmount.map((item, index) => ({
        name: 'User ' + Object.keys(item)[0],
        data: [[index, Object.values(item)[0], thirdDimensionData[index]]]
      })),
      chart: {
        type: 'bubble',
        height: 350
      },
      title: {
        text: 'Paid Products Amount by Users',
        align: 'left'
      },
      xaxis: {
        title: {
          text: 'User Index'
        }
      },
      yaxis: {
        title: {
          text: 'Amount in Dinars'
        }
      }
    };

    const chartElement = document.querySelector('#chartUsersWithPaidProductsAmount');
    if (chartElement) {
      const chart = new ApexCharts(chartElement, chartOptions);
      chart.render();
    }
  }

  renderChartUsersWithPurchasedProductsAndPaidAmount(): void {
    if (this.usersWithPurchasedProducts.length === 0 || this.usersWithPaidProductsAmount.length === 0) {
      return;
    }

    const stackedData = this.usersWithPurchasedProducts.map((item, index) => {
      return {
        x: 'User ' + (index + 1),
        y: [Object.values(item)[0], Object.values(this.usersWithPaidProductsAmount[index])[0]],
      };
    });

    const chartOptions = {
      series: [{
        name: 'Purchased Products',
        data: stackedData.map(item => item.y[0]),
      }, {
        name: 'Paid Products Amount',
        data: stackedData.map(item => item.y[1]),
      }],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
      },
      title: {
        text: 'User Purchase and Payment Analysis',
        align: 'left'
      },
      xaxis: {
        categories: stackedData.map(item => item.x),
      },
      yaxis: {
        title: {
          text: 'Number of Products / Amount in Dinars'
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
      },
    };

    const chartElement = document.querySelector('#chartUsersWithPurchasedProductsAndPaidAmount');
    if (chartElement) {
      const chart = new ApexCharts(chartElement, chartOptions);
      chart.render();
    }
  }

}
