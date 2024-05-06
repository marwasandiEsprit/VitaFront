import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RapportPsy } from 'src/app/models/user';
import { PsychiatristService } from 'src/app/services/psychiatrist.service';

@Component({
  selector: 'app-adminshowrapportpsy',
  templateUrl: './adminshowrapportpsy.component.html',
  styleUrls: ['./adminshowrapportpsy.component.css']
})
export class AdminshowrapportpsyComponent {
  rapportPsyId!: number;
  rapportPsy!: RapportPsy;
  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }
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
