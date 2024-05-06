import { Component } from '@angular/core';
import { StorageService } from 'src/app/_services/storage.service';
import { RapportPsy } from 'src/app/models/user';
import { PsychiatristService } from 'src/app/services/psychiatrist.service';

@Component({
  selector: 'app-adminlisrapportpsy',
  templateUrl: './adminlisrapportpsy.component.html',
  styleUrls: ['./adminlisrapportpsy.component.css']
})
export class AdminlisrapportpsyComponent {
  rapports: RapportPsy[] = [];
  filteredRapports: RapportPsy[] = [];
  filterTerm: string = ''; // Add filterTerm property
  status = false;
  private roles: string[] = [];
  isLoggedIn = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  constructor(private psychiatristService: PsychiatristService,private storageService: StorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.getRapports();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
    }
  }
  isUserRoleAdmin(): boolean {
    return this.roles.includes('ROLE_ADMIN');
  }
  getRapports(): void {
    this.psychiatristService.getAllRapports().subscribe(
      (data: RapportPsy[]) => {
        this.rapports = data;
        this.applyFilters();
      },
      (error) => {
        console.error('Error fetching rapports:', error);
      }
    );
  }

  applyFilters(): void {
    this.filteredRapports = this.rapports.filter(rapport => {
      // Filter by client or psychiatrist username
      return rapport.clients.username?.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
             rapport.psychiatrist.username?.toLowerCase().includes(this.filterTerm.toLowerCase());
    });
  }
  generatePdf(rapportPsyId: number): void {
    this.psychiatristService.generatePdf(rapportPsyId)
      .subscribe(response => {
        console.log(response); // Response from the API
        // Handle success message or further actions
      }, error => {
        console.error(error); // Handle error
      });
  }
}
