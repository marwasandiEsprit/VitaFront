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
  deletequestion(id: number): Observable<void> {
    const url = `${this.QUESTION_API_URL}deletequestion/${id}`;
    return this.httpclient.delete<void>(url);
  }
  editquestion(id: number, quote: Questions) {
    const url = this.QUESTION_API_URL + 'updatequestion/' +quote.questionsid; // Assuming there's an "id" property in the Product object
    return this.httpclient.put(url, quote);
  }
  getquestionId(idquestion: number): Observable<Questions> {
    return this.httpclient.get<Questions>(
      `${this.QUESTION_API_URL}getquestionbyid/${idquestion}`
    );
  }
}
