import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { Observable, tap } from 'rxjs';
import { ChatMessage } from '../models/ChatMessage';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;
  private readonly socketUrl = 'ws://localhost:8085/vita/chat'; // URL du WebSocket de votre backend
  private user = new User();
  constructor() {
    this.socket$ = webSocket(this.socketUrl);
 }


 connect() {
  console.log("okkkk") ;
  this.socket$.next({ type: 'connect', user: this.user });
  return this.socket$.pipe(
    tap((message: any) => {
      console.log('Message reçue du serveur : ', message);
    })
  );
}

 public sendMessage(message: any) {
    this.socket$.next(message);
 }

 public close() {
    this.socket$.complete();
 }

}