import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';
import { RapportPsy, User } from 'src/app/models/user';
import { PsychiatristService } from 'src/app/services/psychiatrist.service';

@Component({
  selector: 'app-updaterapportpsy',
  templateUrl: './updaterapportpsy.component.html',
  styleUrls: ['./updaterapportpsy.component.css']
})
export class UpdaterapportpsyComponent {
  rapportPsyForm!: FormGroup;
  psychiatristId: number | undefined;
  clients: User[] = [];
  rapportPsyId: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private rapportPsyService: PsychiatristService,
    private storageService: StorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeRapportPsyForm();
    this.setPsychiatristIdFromSession();
    this.loadClients();
    this.route.params.subscribe(params => {
      this.rapportPsyId = params['id'];
      if (this.rapportPsyId) {
        this.loadRapportPsy(this.rapportPsyId);
      }
    });
  }

  initializeRapportPsyForm(): void {
    this.rapportPsyForm = this.formBuilder.group({
      description: ['', Validators.required],
      dateRappPs: ['', Validators.required],
      clientId: ['', Validators.required]
    });
  }

  setPsychiatristIdFromSession(): void {
    const user = this.storageService.getUser();
    this.psychiatristId = user?.id;
  }

  loadClients(): void {
    this.rapportPsyService.getclients().subscribe(
      (clients: User[]) => {
        this.clients = clients;
      },
      (error) => {
        console.error('Failed to fetch clients', error);
      }
    );
  }

  loadRapportPsy(id: number): void {
    this.rapportPsyService.getRapportPsyById(id).subscribe(
      (rapportPsy: RapportPsy) => {
        this.rapportPsyForm.patchValue({
          description: rapportPsy.description,
          dateRappPs: rapportPsy.dateRappPs,
          clientId: rapportPsy.clients.id
        });
      },
      (error) => {
        console.error('Failed to fetch rapportPsy', error);
      }
    );
  }

  onSubmit(): void {
    if (this.rapportPsyForm.invalid) {
      return;
    }
  
    const selectedClientId = this.rapportPsyForm.value.clientId;
    const rapportPsy: RapportPsy = {
      idRapportPsy: this.rapportPsyId || 0, // If it's an update, use the existing ID
      description: this.rapportPsyForm.value.description,
      dateRappPs: this.rapportPsyForm.value.dateRappPs,
      psychiatrist: { id: this.psychiatristId },
      clients: { id: selectedClientId }
    };
  
    if (this.rapportPsyId) {
      this.rapportPsyService.updateRapportPsy(this.rapportPsyId,rapportPsy).subscribe(
        (response) => {
          console.log('RapportPsy updated successfully', response);
        },
        (error) => {
          console.error('Failed to update RapportPsy', error);
        }
      );
    } else {
      this.rapportPsyService.addRapportPsy(rapportPsy).subscribe(
        (response) => {
          console.log('RapportPsy added successfully', response);
        },
        (error) => {
          console.error('Failed to add RapportPsy', error);
        }
      );
    }
  }

}
