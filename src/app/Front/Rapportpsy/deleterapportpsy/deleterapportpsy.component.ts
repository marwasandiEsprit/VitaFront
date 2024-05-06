import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PsychiatristService } from 'src/app/services/psychiatrist.service';

@Component({
  selector: 'app-deleterapportpsy',
  templateUrl: './deleterapportpsy.component.html',
  styleUrls: ['./deleterapportpsy.component.css']
})
export class DeleterapportpsyComponent {
  rapportPsyId!: number;

  constructor(private rapportPsyService:PsychiatristService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.rapportPsyId = params['id'];
    });
  }

  deleteRapportPsy() {
    this.rapportPsyService.deleteRapportPsy(this.rapportPsyId).subscribe(() => {
      this.router.navigate(['/rap']); // Redirect to RapportPsy list after deletion
    });
  }
}
