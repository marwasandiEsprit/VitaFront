import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consultation, Feedback, RapportNutr, RapportPsy, User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PsychiatristService {

  private apiUrl = 'http://localhost:8085/vita/api/user';
  private consultation = 'http://localhost:8085/vita/user/';
  private baseUrl = 'http://localhost:8085/vita/consultation'
  private baseUrl1 = 'http://localhost:8085/vita/rapportnutr'
  private rapport = 'http://localhost:8085/vita/rapportpsy'
  private url = 'http://localhost:8085/vita'
  private apiUrl1 = 'http://localhost:8085/vita/rating';
  constructor(private http: HttpClient) { }

  getPsychiatrists(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/psy`);
  }
  getConsultationsByUserId(userId: number): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.consultation}${userId}`);
  }
  getConsultationsBypsyId(userId: number): Observable<Consultation[]> {
    const url = `${this.url}/psy/${userId}`;
    return this.http.get<Consultation[]>(url);
  }
  
  addConsultation(consultation: Consultation): Observable<Consultation> {
    return this.http.post<Consultation>(`${this.baseUrl}/addconsultation`, consultation);
  }
  updateConsultation(id: number, consultation: Consultation): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/updateconsultation/${id}`, consultation);
  }

  getAllConsultations(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.url}/consultation/getall`);
  }

  getConsultationById(id: number): Observable<Consultation> {
    return this.http.get<Consultation>(`${this.baseUrl}/show/${id}`);
  }

  deleteConsultationById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteconsultation/${id}`);
  }
  addRapportPsy(rapportPsy: RapportPsy): Observable<RapportPsy> {
    return this.http.post<RapportPsy>(`${this.rapport}/addrapportpsy`, rapportPsy);
  }

  updateRapportPsy(id: number, rapportPsy: RapportPsy): Observable<void> {
    return this.http.put<void>(`${this.rapport}/updaterapportpsy/${id}`, rapportPsy);
  }

  getRapportPsyById(id: number): Observable<RapportPsy> {
    return this.http.get<RapportPsy>(`${this.rapport}/getrapportpsychologueId/${id}`);
  }

  getAllRapports(): Observable<RapportPsy[]> {
    return this.http.get<RapportPsy[]>(`${this.rapport}/getAll`);
  }
  getclients(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/client`);
  }
  getRapportPsyByPsychiatristId(psychiatristId: number): Observable<RapportPsy[]> {
    const url = `${this.url}/psychiatrist/${psychiatristId}`;
    return this.http.get<RapportPsy[]>(url);
  }
  deleteRapportPsy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.rapport}/deleterapportpsychologue/${id}`);
  }
  getConsultationsPerDayInMonth(psychologueId: number, year: number, month: string): Observable<any> {
    // Adjust the URL based on your backend API endpoint
    const url = `http://localhost:8085/vita/consultations/${psychologueId}/${year}/${month}`;
    return this.http.get<any>(url);
  }
  getAllQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.url+'/questions/getall');
  }
  getAnswerByQuestionId(questionId: number): Observable<any> {
    return this.http.get<any>(`${this.url}answers/${questionId}`);
}
findAvailableTimeSlots(date: string, psychologistId: number): Observable<string[]> {
  const url = `${this.url}/${psychologistId}/${date}`;
  return this.http.get<string[]>(url);
}  saveFeedback(feedback: Feedback) {
  return this.http.post(this.apiUrl1, feedback);
}


getAverageRating(therapistId: number): Observable<number> {
  return this.http.get<number>(`http://localhost:8085/vita/{{therapistId}}/average-rating`);
}
getConsultationCountPerClient(psychiatristId: number): Observable<Map<string, number>> {
  const url = `${this.url}/psychiatrist/${psychiatristId}/consultationCountPerClient`;
  return this.http.get<Map<string, number>>(url)

}
getTotalConsultationsPerPsychiatrist(): Observable<Map<string, number>> {
  return this.http.get<Map<string, number>>(`${this.url}/totalConsultationsPerPsychiatrist`);
}
generatePdf(rapportPsyId: number): Observable<string> {
  return this.http.get<string>(`${this.url}/generate-pdf/${rapportPsyId}`);
}
public ajouterRapportNutritionniste(rapportNutr: RapportNutr): Observable<RapportNutr> {
  return this.http.post<RapportNutr>(`${this.baseUrl1}/addrapportnutritionniste`, rapportNutr);
}

public updateRapportNutritionniste(idRapportNutr: number, rapport: RapportNutr): Observable<any> {
  return this.http.put(`${this.baseUrl1}/updaterapportnutritionniste/${idRapportNutr}`, rapport);
}

public getRapportNutritionnisteById(idRapportNutr: number): Observable<RapportNutr> {
  return this.http.get<RapportNutr>(`${this.baseUrl1}/getrapportnutritionnisteById/${idRapportNutr}`);
}

public chercherTousRapportNutritionniste(): Observable<RapportNutr[]> {
  return this.http.get<RapportNutr[]>(`${this.baseUrl1}/getAll`);
}
getUsersWithNutritionistSpecialty(): Observable<User[]> {
  return this.http.get<User[]>('http://localhost:8085/vita/api/user/Nutre');
}
}
