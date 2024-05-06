import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Questions } from '../models/Questions';
@Injectable({
  providedIn: 'root'
})
export class QuestionsServiceService {
  readonly QUESTION_API_URL = 'http://localhost:8085/vita/questions/';
  constructor(private httpclient: HttpClient) {}

  addQuestion(question: Questions) {
    return this.httpclient.post(this.QUESTION_API_URL + 'addquestion', question);
  }

  getAllQuestions() {
    return this.httpclient.get<Questions[]>(this.QUESTION_API_URL + 'getallquestion');
  }
}
