import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';
import { QuestionsServiceService } from 'src/app/components/questions-service.service';
import { Questions } from 'src/app/models/Questions';

@Component({
  selector: 'app-edite-question',
  templateUrl: './edite-question.component.html',
  styleUrls: ['./edite-question.component.css']
})
export class EditeQuestionComponent implements OnInit{
  id: number=0;
  product: Questions = new Questions();
  status: boolean = false;
  private roles: string[] = [];
  isLoggedIn = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quoteService: QuestionsServiceService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    

    this.quoteService.getquestionId(this.id).subscribe(data=>{
      this.product= data;
    })

    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
    }
  }
  isUserRoleAdmin(): boolean {
    return this.roles.includes('ROLE_ADMIN');
  }
  UpdateProduct(): void {
    this.quoteService.editquestion(this.id, this.product).subscribe(() => {
  
      this.router.navigate(['/allquestionAd/']);
    });
  }
}



