import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Consultation } from 'src/app/models/user';
import { PsychiatristService } from 'src/app/services/psychiatrist.service';

@Component({
  selector: 'app-showconsultationadmin',
  templateUrl: './showconsultationadmin.component.html',
  styleUrls: ['./showconsultationadmin.component.css']
})
export class ShowconsultationadminComponent {
  consultationId: number | undefined;
  consultation: Consultation | undefined;
  status: boolean = false;
  
 
  addToggle()
  {
    this.status = !this.status;       
  }

  constructor(
    private route: ActivatedRoute,
    private consultationService: PsychiatristService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.consultationId = +params['id']; // Extract the consultation ID from route parameters
      this.loadConsultationDetails();
    });
  }

  loadConsultationDetails(): void {
    if (this.consultationId) {
      this.consultationService.getConsultationById(this.consultationId).subscribe(
        (consultation: Consultation) => {
          this.consultation = consultation;
        },
        (error) => {
          console.error('Failed to fetch consultation details', error);
        }
      );
    }
  }

}
