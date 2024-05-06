import { Component } from '@angular/core';
import { StorageService } from 'src/app/_services/storage.service';
import { RapportPsy } from 'src/app/models/user';
import { PsychiatristService } from 'src/app/services/psychiatrist.service';

@Component({
  selector: 'app-listrapportpsy',
  templateUrl: './listrapportpsy.component.html',
  styleUrls: ['./listrapportpsy.component.css']
})
export class ListrapportpsyComponent {
  rapports!: RapportPsy[];
  filteredRapports!: RapportPsy[]; // Added property for filtered rapports
  filterTerm: string = ''; 
  private roles: string[] = [];
  isLoggedIn = false;
  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  constructor(private psychiatristService: PsychiatristService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.storageService.isLoggedIn()) {
      if (this.isLoggedIn) {
        const user = this.storageService.getUser();
        this.roles = user.roles;
      }
      const user = this.storageService.getUser();
      const psychiatristId = user?.id;
      if (psychiatristId) {
        this.getRapportsByPsychiatristId(psychiatristId);
      } else {
        console.error('Psychiatrist ID not found in session.');
      }
    } else {
      console.error('User not logged in.');
    }
  }
  isUserRoleAdmin(): boolean {
    return this.roles.includes('ROLE_ADMIN');
  }
  getRapportsByPsychiatristId(psychiatristId: number): void {
    this.psychiatristService.getRapportPsyByPsychiatristId(psychiatristId)
      .subscribe(
        (data: RapportPsy[]) => {
          this.rapports = data;
          this.applyFilters(); // Apply username filter initially
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