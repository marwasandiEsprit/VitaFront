import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';
import { Feedback } from 'src/app/models/user';
import { PsychiatristService } from 'src/app/services/psychiatrist.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  user: any;
  therapistId = 4;
  userId = 1;
  selectedRating!: number;


  constructor(private userService: UserService,private feedbackService: PsychiatristService,  private route: ActivatedRoute,private storageService:StorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.therapistId = +params['id'];
    });// Replace with the actual user ID
    this.userService.getUser(this.therapistId).subscribe(
      user => {
        this.user = user;
      },
      error => {
        console.error('Error fetching user details:', error);
      }
    );
     this.setClientIdFromSession()
  }
  setRating(rating: number): void {
    this.selectedRating = rating;
  }
  setClientIdFromSession(): void {
    const user = this.storageService.getUser(); // Get user information from session
    const userId = user?.id;
    
    // Set the user ID in the feedback object
    this.userId = userId;
  
    // Update the consultationForm with the user ID if available
  
  }
  submitFeedback() {
    const feedback: Feedback = {
      therapist: { id: this.therapistId },
      user: { id: this.userId },
      rating: this.selectedRating
    };

    this.feedbackService.saveFeedback(feedback)
      .subscribe(
        () => {
          console.log('Feedback saved successfully!');
        },
        (error) => {
          console.error('Failed to save feedback:', error);
        }
      );
  }

}
