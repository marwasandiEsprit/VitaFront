import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Posts} from "../models/posts";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private baseUrl = 'http://localhost:8085/vita/posts';

  constructor(private http: HttpClient) {
  }

  addNewPost(post: Posts, communityId: number): Observable<Posts> {
    return this.http.post<Posts>(`${this.baseUrl}/add?communityId=${communityId}`, post);
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${postId}`);
  }

  updatePost(postRequest: Posts, postId: number): Observable<Posts> {
    return this.http.put<Posts>(`${this.baseUrl}/${postId}`, postRequest);
  }

  getCommunityPosts(communityId: number): Observable<Posts[]> {
    return this.http.get<Posts[]>(`${this.baseUrl}/community/${communityId}`);
  }

  getUserPosts(userId: number): Observable<Posts[]> {
    return this.http.get<Posts[]>(`${this.baseUrl}/user/${userId}`);
  }

  postDetails(postId: number, communityId: number): Observable<Posts> {
    return this.http.get<Posts>(`${this.baseUrl}/${postId}/community/${communityId}`)
  }

  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/media`, formData, {
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
