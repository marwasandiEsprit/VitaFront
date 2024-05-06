import { Component } from '@angular/core';
import { StorageService } from 'src/app/_services/storage.service';
import { Consultation } from 'src/app/models/user';
import { PsychiatristService } from 'src/app/services/psychiatrist.service';

@Component({
  selector: 'app-listconsultation',
  templateUrl: './listconsultation.component.html',
  styleUrls: ['./listconsultation.component.css']
})
export class ListconsultationComponent {
  consultations!: Consultation[];
  filteredConsultations!: Consultation[];
  filterTerm: string = '';
  status: boolean = false;
  private roles: string[] = [];
  isLoggedIn = false;
 
  addToggle()
  {
    this.status = !this.status;       
  }

  constructor(private consultationService: PsychiatristService,private storageService: StorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.getConsultationsByUserId();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
    }
  }
  isUserRoleAdmin(): boolean {
    return this.roles.includes('ROLE_ADMIN');
  }
  getConsultationsByUserId(): void {
    this.consultationService.getAllConsultations()
      .subscribe(
        (data: Consultation[]) => {
          this.consultations = data;
          this.applyFilters(); // Apply filters initially
        },
        (error) => {
          console.error('Error fetching consultations:', error);
        }
      );
  }

  applyFilters(): void {
    if (!this.filterTerm) {
      // If filter term is empty, show all consultations
      this.filteredConsultations = this.consultations;
    } else {
      // Filter consultations by psychiatrist username or client username
      this.filteredConsultations = this.consultations.filter(consultation =>
        consultation.psychiatrist.username?.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
        consultation.client.username?.toLowerCase().includes(this.filterTerm.toLowerCase())
      );
    }
  }
}
