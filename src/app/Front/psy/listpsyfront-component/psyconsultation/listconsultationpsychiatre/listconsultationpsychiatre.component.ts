import { Component } from '@angular/core';
import { StorageService } from 'src/app/_services/storage.service';
import { Consultation } from 'src/app/models/user';
import { PsychiatristService } from 'src/app/services/psychiatrist.service';

@Component({
  selector: 'app-listconsultationpsychiatre',
  templateUrl: './listconsultationpsychiatre.component.html',
  styleUrls: ['./listconsultationpsychiatre.component.css']
})
export class ListconsultationpsychiatreComponent {
  consultations!: Consultation[];
  filteredConsultations!: Consultation[]; // New array to store filtered consultations
  filterUsername: string = ''; // Variable to store the filter value

  constructor(private consultationService: PsychiatristService, private storageService: StorageService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      const user = this.storageService.getUser(); // Get user information from session
      const clientId = user?.id;
      console.log("the id is :",clientId) // Assuming user object has an 'id' property for client ID
      if (clientId) {
        this.getConsultationsByUserId(clientId); // Pass the client ID to fetch consultations
      } else {
        console.error('Client ID not found in session.');
      }
    } else {
      console.error('User not logged in.');
    }
  }

  getConsultationsByUserId(userId: number): void {
    this.consultationService.getConsultationsBypsyId(userId)
      .subscribe(
        (data: Consultation[]) => {
          this.consultations = data.sort((a, b) => {
            const dateA = new Date(a.consultationdate);
            const dateB = new Date(b.consultationdate);
            return dateA.getTime() - dateB.getTime(); // Sort by ascending order of date
          });
          this.filteredConsultations = this.consultations; // Initialize the filtered consultations with all consultations
          console.log("this is finished");
        },
        (error) => {
          console.error('Error fetching consultations:', error);
        }
      );
  }

  applyFilter(): void {
    if (this.filterUsername.trim()) {
      this.filteredConsultations = this.consultations.filter((consultation: Consultation) =>
        consultation.client.username?.toLowerCase().includes(this.filterUsername.toLowerCase())
      );
    } else {
      this.filteredConsultations = this.consultations; // If filter is empty, show all consultations
    }
  }
}