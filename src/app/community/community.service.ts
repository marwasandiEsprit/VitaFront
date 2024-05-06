import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Community} from "../models/community";


@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  private baseUrl = 'http://localhost:8085/vita/communities';
  private loggedInUserId = 1;

  constructor(private http: HttpClient) {
  }

  addCommunity(community: Community): Observable<Community> {
    return this.http.post<Community>(this.baseUrl, community);
  }

  getCommunityById(id: number): Observable<Community> {
    return this.http.get<Community>(`${this.baseUrl}/${id}`);
  }

  getAllCommunities(): Observable<Community[]> {
    return this.http.get<Community[]>(this.baseUrl);
  }

  addUserToCommunity(communityId: number): Observable<Community> {
    return this.http.post<Community>(`${this.baseUrl}/${communityId}/users/${this.loggedInUserId}`, {});
  }

  updateCommunity(id: number, community: Community): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, community);
  }

  deleteCommunity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  searchCommunity(searchTerm: string): Observable<Community[]> {
    return this.http.get<Community[]>(`${this.baseUrl}/search?query=${searchTerm}`);
  }
}
