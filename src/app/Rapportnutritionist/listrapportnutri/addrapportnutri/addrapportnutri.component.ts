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
  
  rapportNutr: RapportNutr = { nutristionist: {} as User }; // Initialize with an empty User object
  nutritionists: User[] = [];
  clients: User[] = [];

  constructor(
    private rapportNutrService: PsychiatristService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getNutritionists();
    this.loadClients();
  }

  getNutritionists(): void {
    this.rapportNutrService.getUsersWithNutritionistSpecialty().subscribe(
      (data: User[]) => {
        this.nutritionists = data;
      },
      (error: any) => {
        console.error('Failed to fetch nutritionists:', error);
      }
    );
  }

  loadClients(): void {
    this.rapportNutrService.getclients().subscribe(
      (clients: User[]) => {
        this.clients = clients;
      },
      (error) => {
        console.error('Failed to fetch clients', error);
      }
    );
  }

  addRapportNutr() {
    this.rapportNutrService.ajouterRapportNutritionniste(this.rapportNutr).subscribe(() => {
      this.router.navigate(['/rapport-nutr-list']);
    });
  }
}
