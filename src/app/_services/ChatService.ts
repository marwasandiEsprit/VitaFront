import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plat } from '../models/Plat';
import { PlatsQauntites } from '../models/PlatsQauntites';
import { ChatRoom } from '../models/ChatRoom';
import { ChatMessage } from '../models/ChatMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:8085/vita/chat'; // Replace 'your-api-url' with your actual API URL

  constructor(private http: HttpClient) { }

  getChatRoomByClientId(id : any): Observable<ChatRoom[]> {
    return this.http.get<ChatRoom[]>(`${this.apiUrl}/getChatRoomByClientId/${id}`);
  }
  getChatRoomByNutionisteId(id : any) : Observable<ChatRoom[]> {
    return this.http.get<ChatRoom[]>(`${this.apiUrl}/getChatRoomByNutionisteId/${id}`);
  }
  getMessages(id : any): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/getMessages/${id}`);
  }
  ajouterChatRoom(chatRoom : ChatRoom) : Observable<ChatRoom> {
    return this.http.post<ChatRoom>(`${this.apiUrl}/addChatRoom`,chatRoom)
  }
  ajouterChatMessage(chatMessage : ChatMessage) : Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${this.apiUrl}/addMessage`,chatMessage)
  }
}