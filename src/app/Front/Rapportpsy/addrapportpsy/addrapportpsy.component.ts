import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/_services/storage.service';
import { RapportPsy, User } from 'src/app/models/user';
import { PsychiatristService } from 'src/app/services/psychiatrist.service';

@Component({
  selector: 'app-addrapportpsy',
  templateUrl: './addrapportpsy.component.html',
  styleUrls: ['./addrapportpsy.component.css']
})
export class AddrapportpsyComponent {
  rapportPsyForm!: FormGroup;
  psychiatristId: number | undefined;
  clients: User[] = [];
  status = false;
  private roles: string[] = [];
  isLoggedIn = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  constructor(
    private formBuilder: FormBuilder,
    private rapportPsyService: PsychiatristService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
    }
    this.initializeRapportPsyForm();
    this.setPsychiatristIdFromSession();
    this.loadClients();
  }
  isUserRoleAdmin(): boolean {
    return this.roles.includes('ROLE_ADMIN');
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

  onSubmit(): void {
    if (this.rapportPsyForm.invalid) {
      return;
    }
  
    const selectedClientId = this.rapportPsyForm.value.clientId;
    const rapportPsy: RapportPsy = {
      idRapportPsy: 0,
      description: this.rapportPsyForm.value.description,
      dateRappPs: this.rapportPsyForm.value.dateRappPs,
      psychiatrist: { id: this.psychiatristId },
      clients: { id: selectedClientId }
    };
  
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
