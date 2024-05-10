import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/components/user.service';
import { RapportNutr, User } from 'src/app/models/user';
import { PsychiatristService } from 'src/app/services/psychiatrist.service';

@Component({
  selector: 'app-addrapportnutri',
  templateUrl: './addrapportnutri.component.html',
  styleUrls: ['./addrapportnutri.component.css']
})
export class AddrapportnutriComponent {
  rapportNutr: RapportNutr = {};

  nutritionists: User[] = [];
  clients: User[] = [];

  constructor(
    private rapportNutrService: PsychiatristService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getNutritionists();
    this.getClients();
  }

  getNutritionists(): void {
    this.rapportNutrService.getUsersWithNutritionistSpecialty().subscribe(
      (nutritionists: User[]) => {
        this.nutritionists = nutritionists;
      },
      (error: any) => {
        console.error('Failed to fetch nutritionists:', error);
      }
    );
  }

  getClients(): void {
    this.rapportNutrService.getclients().subscribe(
      (clients: User[]) => {
        this.clients = clients;
      },
      (error: any) => {
        console.error('Failed to fetch clients:', error);
      }
    );
  }

  addRapportNutr(): void {
    if (!this.validateForm()) {
      console.error('Please fill in all the required fields.');
      return;
    }

    this.rapportNutrService.ajouterRapportNutritionniste(this.rapportNutr).subscribe(
      () => {
        this.router.navigate(['/rapport-nutr-list']);
      },
      (error: any) => {
        console.error('Failed to add rapport nutr:', error);
      }
    );
  }

  validateForm(): boolean {
    return !!(
      this.rapportNutr.description &&
      this.rapportNutr.dateRappNutr &&
      this.rapportNutr.nutristionist &&
      this.rapportNutr.clients
    );
  }
}