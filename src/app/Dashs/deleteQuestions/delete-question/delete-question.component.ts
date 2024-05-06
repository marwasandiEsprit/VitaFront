import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';
import { QuestionsServiceService } from 'src/app/components/questions-service.service';
import { Questions } from 'src/app/models/Questions';

@Component({
  selector: 'app-delete-question',
  templateUrl: './delete-question.component.html',
  styleUrls: ['./delete-question.component.css']
})
export class DeleteQuestionComponent implements OnInit{
  id: number=0;
  quote: Questions = new Questions();
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

    this.quoteService.getquestionId(this.id).subscribe(data => {
      this.quote = data;
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
  confirmDelete(): void {
    if (confirm('Are you sure you want to delete this Q&A?')) {
      this.deleteProduct();
    }
  }
  deleteProduct(): void {
    this.quoteService.deletequestion(this.id).subscribe(() => {

      this.router.navigate(['/allquestionAd']); 
    });
  }

}


