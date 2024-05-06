import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comments} from "../models/posts";
import {PagedResponse} from "../models/PagedResponse";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private baseUrl = 'http://localhost:8085/vita/comments'; // Adjust URL as needed

  constructor(private http: HttpClient) {
  }

  addNewComment(newComment: Comments, postId: number): Observable<Comments> {
    return this.http.post<Comments>(`${this.baseUrl}/post/${postId}`, newComment);
  }

  deleteComment(idComment: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idComment}`);
  }

  updateComment(commentRequest: Comments, idComment: number): Observable<Comments> {
    return this.http.put<Comments>(`${this.baseUrl}/${idComment}`, commentRequest);
  }

  getAllCommentsByPage(pageNumber: number, postId: number, sort: string): Observable<PagedResponse<Comments>> {
    return this.http.get<PagedResponse<Comments>>(`${this.baseUrl}/post/${postId}?pageNumber=${pageNumber}&sortBy=${sort}`);
  }
}
