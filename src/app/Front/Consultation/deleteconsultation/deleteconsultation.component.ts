import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PsychiatristService } from 'src/app/services/psychiatrist.service';

@Component({
  selector: 'app-deleteconsultation',
  templateUrl: './deleteconsultation.component.html',
  styleUrls: ['./deleteconsultation.component.css']
})
export class DeleteconsultationComponent {
  consultationId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private consultationService: PsychiatristService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.consultationId = +params['id']; // Extract the consultation ID from route parameters
   
    });
  }

  deleteConsultation(): void {
    if (this.consultationId) {
      this.consultationService.deleteConsultationById(this.consultationId).subscribe(
        () => {
          console.log('Consultation deleted successfully');
          this.router.navigate(['/consultations']); // Redirect to the list of consultations page
        },
        (error) => {
          console.error('Failed to delete consultation', error);
        }
      );
    }
  }

}
