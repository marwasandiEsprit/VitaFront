import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';
import { Consultation, User } from 'src/app/models/user';
import { PsychiatristService } from 'src/app/services/psychiatrist.service';

@Component({
  selector: 'app-editconsultation',
  templateUrl: './editconsultation.component.html',
  styleUrls: ['./editconsultation.component.css']
})
export class EditconsultationComponent {
  consultationForm!: FormGroup;
  clientId: number | undefined;
  consultationId: number | undefined;
  psychiatrists: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private consultationService: PsychiatristService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeConsultationForm();
    this.setClientIdFromSession();
    this.loadConsultation();
    this.loadPsychiatrists();
  }

  initializeConsultationForm(): void {
    this.consultationForm = this.formBuilder.group({
      startTime: ['', Validators.required],
      consultationDate: ['', Validators.required],
      psychiatristId: ['', Validators.required],
      clientId: ['', Validators.required]
    });
  }

  setClientIdFromSession(): void {
    const user = this.storageService.getUser(); // Get user information from session
    this.clientId = user?.id;
    if (this.clientId) {
      this.consultationForm.patchValue({ clientId: this.clientId });
    }
  }

  loadConsultation(): void {
    this.route.params.subscribe(params => {
      this.consultationId = +params['id']; // Extract the consultation ID from route parameters
      this.consultationService.getConsultationById(this.consultationId).subscribe(
        (consultation: Consultation) => {
          this.populateConsultationForm(consultation); // Populate the form with consultation details
        },
        (error) => {
          console.error('Failed to fetch consultation', error);
        }
      );
    });
  }

  populateConsultationForm(consultation: Consultation): void {
    this.consultationForm.patchValue({
      startTime: consultation.startTime,
      consultationDate: consultation.consultationdate,
      psychiatristId: consultation.psychiatrist.id
    });
  }

  loadPsychiatrists(): void {
    this.consultationService.getPsychiatrists().subscribe(
      (psychiatrists: User[]) => {
        this.psychiatrists = psychiatrists;
      },
      (error) => {
        console.error('Failed to fetch psychiatrists', error);
      }
    );
  }

  onSubmit(): void {
    if (this.consultationForm.invalid || !this.consultationId) {
      return;
    }

    const consultation: Consultation = {
      idConsultation: this.consultationId, // Assuming the consultation object has an ID property
      startTime: this.consultationForm.value.startTime,
      consultationdate: this.consultationForm.value.consultationDate,
      psychiatrist: { id: this.consultationForm.value.psychiatristId },
      client: { id: this.consultationForm.value.clientId }
    };

    this.consultationService.updateConsultation(this.consultationId, consultation).subscribe(
      (response) => {
        // Handle successful response
        console.log('Consultation updated successfully', response);
        this.router.navigate(['/consultations']); // Redirect to the list of consultations page
      },
      (error) => {
        // Handle error
        console.error('Failed to update consultation', error);
      }
    );
  }
}
