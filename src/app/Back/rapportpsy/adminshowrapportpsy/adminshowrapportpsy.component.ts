import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';
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
  status: boolean = false;
  private roles: string[] = [];
  isLoggedIn = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  constructor(private rapportPsyService: PsychiatristService, private route: ActivatedRoute,private storageService: StorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.rapportPsyId = params['id'];
      this.loadRapportPsy();
    });
  this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
    }
  }
  isUserRoleAdmin(): boolean {
    return this.roles.includes('ROLE_ADMIN');
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
