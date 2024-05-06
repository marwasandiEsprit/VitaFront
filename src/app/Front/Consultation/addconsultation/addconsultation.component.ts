import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';
import { Consultation, User } from 'src/app/models/user';
import { PsychiatristService } from 'src/app/services/psychiatrist.service';

@Component({
  selector: 'app-addconsultation',
  templateUrl: './addconsultation.component.html',
  styleUrls: ['./addconsultation.component.css']
})
export class AddconsultationComponent implements OnInit {
  consultationForm!: FormGroup;
  clientId: number | undefined;
  psychiatrists: User[] = [];
  availableTimeSlots!: string[];
  currentDate: Date = new Date();
  redLinePosition: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private consultationService: PsychiatristService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.calculateRedLinePosition();
    this.initializeConsultationForm();
    this.setClientIdFromSession();
    let psychiatristId: number; // Declare psychiatristId here

    this.route.params.subscribe((params) => {
      psychiatristId = params['id']; // Assign value to psychiatristId here
      if (psychiatristId) {
        this.consultationForm.patchValue({ psychiatristId: psychiatristId });
        this.loadPsychiatristById(psychiatristId);
      }
    });

    this.consultationForm.get('consultationDate')?.valueChanges.subscribe((selectedDate) => {
      if (selectedDate) {
        const modifiedDate = new Date(selectedDate); // Create a new Date object with the selectedDate
        modifiedDate.setDate(modifiedDate.getDate() + 1); // Add a day to the date
        const formattedDate = this.formatDate(modifiedDate); // Format the modified date
        console.log("date", formattedDate);
        this.loadAvailableTimeSlots(formattedDate, psychiatristId);
      }
    });
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
  calculateRedLinePosition(): void {
    const d = new Date();
    const gridCellContainer = document.querySelector(".dayview-gridcell-container") as HTMLElement | null;
    if (gridCellContainer) {
      const hourHeight = gridCellContainer.getBoundingClientRect().height / 24;
      const currentHour = d.getHours() + d.getMinutes() / 60;
      this.redLinePosition = hourHeight * currentHour; // Update redLinePosition property
      const redLine = document.querySelector(".dayview-now-marker") as HTMLElement | null;
      if (redLine) {
        redLine.style.top = this.redLinePosition + "px"; // Update red line position in the DOM
      }
    }
  }

  loadPsychiatristById(psychiatristId: number): void {
    this.userService.getUser(psychiatristId).subscribe(
      (psychiatrist: User) => {
        if (psychiatrist) {
          // Update the psychiatrists array with the single psychiatrist
          this.psychiatrists = [psychiatrist];
        }
      },
      (error) => {
        console.error('Failed to fetch psychiatrist', error);
      }
    );
  }

  loadAvailableTimeSlots(date: string, psychiatristId: number): void {
    this.consultationService.findAvailableTimeSlots(date, psychiatristId).subscribe(
      (timeSlots) => {
        this.availableTimeSlots = timeSlots;
      },
      (error) => {
        console.error('Error fetching available time slots:', error);
      }
    );
  }

  formatDate(date: Date): string {
    // Implement your logic to format the date as needed
    // For example: return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return date.toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.consultationForm.invalid) {
      return;
    }

    const consultation: Consultation = {
      startTime: this.consultationForm.value.startTime,
      consultationdate: this.consultationForm.value.consultationDate,
      psychiatrist: { id: this.consultationForm.value.psychiatristId },
      client: { id: this.consultationForm.value.clientId }
    };

    this.consultationService.addConsultation(consultation).subscribe(
      (response) => {
        // Handle successful response
        console.log('Consultation added successfully', response);
        this.router.navigate(['/consultations']); 
      },
      (error) => {
        // Handle error
        console.error('Failed to add consultation', error);
      }
    );
  }

  getGridRow(index: number): string {
    const startTime = parseInt(this.availableTimeSlots[0].split(':')[0], 10); // Get the start hour from the first time slot
    const endTime = parseInt(this.availableTimeSlots[this.availableTimeSlots.length - 1].split(':')[0], 10) + 1; // Get the end hour from the last time slot
    const slotTime = parseInt(this.availableTimeSlots[index].split(':')[0], 10); // Get the hour of the current time slot
    const start = (slotTime - startTime) * 3 + 37; // Calculate the start grid row
    const end = start + 4; // Calculate the end grid row
    return `${start}/${end}`;
  }
}