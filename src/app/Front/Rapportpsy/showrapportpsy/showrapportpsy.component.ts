import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RapportPsy } from 'src/app/models/user';
import { PsychiatristService } from 'src/app/services/psychiatrist.service';

@Component({
  selector: 'app-showrapportpsy',
  templateUrl: './showrapportpsy.component.html',
  styleUrls: ['./showrapportpsy.component.css']
})
export class ShowrapportpsyComponent {
  rapportPsyId!: number;
  rapportPsy!: RapportPsy;

  constructor(private rapportPsyService: PsychiatristService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.rapportPsyId = params['id'];
      this.loadRapportPsy();
    });
  }

  loadRapportPsy() {
    this.rapportPsyService.getRapportPsyById(this.rapportPsyId).subscribe(
      (rapportPsy: RapportPsy) => {
        this.rapportPsy = rapportPsy;
      },
      error => {
        console.error('Error loading rapport psy:', error);
      }
    );
  }
}
