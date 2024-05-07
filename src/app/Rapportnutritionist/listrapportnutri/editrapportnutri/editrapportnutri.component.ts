import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/components/user.service';
import { RapportNutr, User } from 'src/app/models/user';
import { PsychiatristService } from 'src/app/services/psychiatrist.service';

@Component({
  selector: 'app-editrapportnutri',
  templateUrl: './editrapportnutri.component.html',
  styleUrls: ['./editrapportnutri.component.css']
})
export class EditrapportnutriComponent {
  
  rapportNutr: RapportNutr = { nutristionist: {} as User }; // Initialize with an empty User object
  nutritionists: User[] = [];
  clients: User[] = [];
  id: number | null = null; // Change type to 'number'
 // Declare id variable and initialize it as null

  constructor(
    private rapportNutrService: PsychiatristService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadRapportNutr();
    this.getNutritionists();
    this.loadClients();
  }

  loadRapportNutr(): void {
    this.id = this.route.snapshot.params['id']; // Assign route parameter 'id' to this.id
    if (this.id) {
      this.rapportNutrService.getRapportNutritionnisteById(this.id).subscribe(
        (rapportNutr: RapportNutr) => {
          this.rapportNutr = rapportNutr;
        },
        (error: any) => {
          console.error('Failed to fetch rapportNutr:', error);
        }
      );
    }
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

  updateRapportNutr(): void {
    if (this.id) { // Check if id is not null before using it
      this.rapportNutrService.updateRapportNutritionniste(this.id, this.rapportNutr).subscribe(() => {
        this.router.navigate(['/rapport-nutr-list']);
      });
    } else {
      console.error('Invalid id:', this.id);
    }
  }

}
