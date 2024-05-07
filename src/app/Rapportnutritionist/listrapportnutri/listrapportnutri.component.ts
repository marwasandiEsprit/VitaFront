import { Component } from '@angular/core';
import { RapportNutr } from 'src/app/models/user';
import { PsychiatristService } from 'src/app/services/psychiatrist.service';

@Component({
  selector: 'app-listrapportnutri',
  templateUrl: './listrapportnutri.component.html',
  styleUrls: ['./listrapportnutri.component.css']
})
export class ListrapportnutriComponent {
  rapportNutrs: RapportNutr[] = [];

  constructor(private rapportNutrService: PsychiatristService) {}

  ngOnInit(): void {
    this.rapportNutrService.chercherTousRapportNutritionniste().subscribe(
      rapportNutrs => {
        this.rapportNutrs = rapportNutrs;
      },
      error => {
        console.error('Error fetching rapport nutr:', error);
      }
    );
  }
}
