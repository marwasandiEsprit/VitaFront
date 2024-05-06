import { Component, ElementRef,ViewChild , OnInit } from '@angular/core';
import { ChatRoom } from '../models/ChatRoom';
import { ChatMessage } from '../models/ChatMessage';
import { User } from '../models/user';
import { StorageService } from '../_services/storage.service';
import { ChatService } from '../_services/ChatService';
import { UserService } from '../_services/user.service';
import { WebSocketService } from '../_services/WebSocketService';
import { Role } from '../models/Role';
import { Subscription, debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { ERole } from '../models/ERole';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  userRole: string = 'client';
  user = new User() ;
  chatRoomListRef: ElementRef;
  clickSubscription: Subscription;
  newChatroom = new ChatRoom();
  selectedNutrioniste : number | null = null ;
  users : User[] = [] ;
  chatRooms: ChatRoom[] = [];
  selectedChatRoom = new ChatRoom();
  nutritionistes : User[] = [] ;
  default : User[] = [] ;
  result:number | null = null ;
  constructor(private elRef: ElementRef,private chatRoomService: ChatService,private storageService : StorageService,private userService: UserService,private webSocketService: WebSocketService) {
this.user = this.storageService.getUser();
this.clickSubscription = new Subscription();
this.chatRoomListRef = this.elRef.nativeElement.querySelector('#chatRoomList');
  }

  ngOnInit(): void {
    let clientRole = 'ROLE_CLIENT';
    let nutrionisteRole = 'ROLE_NUTRITOINISTE';

    if (this.user?.roles?.includes(clientRole)) {
      this.getChatRoomsByClientId();
    } else if (this.user?.roles?.includes(nutrionisteRole) ) {
      this.getChatRoomsByNutritionistId();
    }
  }

  setupChatRoomSelection() {
    if (this.chatRoomListRef && this.chatRoomListRef.nativeElement) {
      const click$ = fromEvent(this.chatRoomListRef.nativeElement, 'click');
  
      this.clickSubscription = click$
        .pipe(
          debounceTime(3000),
          distinctUntilChanged()
        )
        .subscribe((event: any) => {
          const target = event.target as HTMLElement;
          const chatRoom = target.innerText.trim();
          this.selectChatRoom(this.selectedChatRoom);
        });
    }
  }
  
  ngAfterViewInit() {
    this.setupChatRoomSelection();
  }
  getChatRoomsByClientId(): void {
    this.chatRoomService.getChatRoomByClientId(this.user?.id).subscribe((chatRooms: ChatRoom[]) => {
      this.chatRooms = chatRooms;
    });
  }

  getChatRoomsByNutritionistId(): void {
    this.chatRoomService.getChatRoomByNutionisteId(this.user?.id).subscribe((chatRooms: ChatRoom[]) => {
      this.chatRooms = chatRooms;
    });
  }

  selectChatRoom(chatRoom: ChatRoom): void {
    this.selectedChatRoom = chatRoom;
    this.chatRoomService.getMessages(this.selectedChatRoom.id).subscribe( m =>  this.selectedChatRoom.messages = m) ;
     // Se connecter au serveur WebSocket lorsqu'une salle de chat est sélectionnée
     this.webSocketService.connect();

  }
  getUsername(chatRoom: ChatRoom): string {
    let username = '';
    let clientRole = 'ROLE_CLIENT';
    let nutrionisteRole = 'ROLE_NUTRITOINISTE';

    if (this.user?.roles?.includes(clientRole)) {
        username = chatRoom.nutritionist?.username ?? '';
    } else if (this.user?.roles?.includes(nutrionisteRole)) {
        username = chatRoom.client?.username ?? '';
    }
    return username;
}
AddNewDiscussion() {
  this.userService.findByRolesName(ERole.ROLE_NUTRITOINISTE).subscribe(users => {
    // Filtrez les utilisateurs qui ne sont pas déjà dans une chatRoom en tant que nutritionniste
    this.nutritionistes = users.filter(user => !this.chatRooms.some(chatRoom => chatRoom.nutritionist?.id === user.id));
  });

  if(this.user?.roles?.includes('ROLE_CLIENT')) {
    this.result = 200 ;
  }
}
ngOnDestroy(): void {
  this.webSocketService.close();
  this.clickSubscription.unsubscribe();
}


sendMessage(content: string): void {
  let client = new User() ;
  client.id = this.user.id ;
  let addedChat = new ChatRoom() ;
  const message = new ChatMessage();
  message.content = content;
  message.sender = client;
  addedChat.id = this.selectedChatRoom.id ;
  message.chatRoom = addedChat;

this.selectedChatRoom.messages?.push(message);
this.chatRoomService.ajouterChatMessage(message).subscribe({
  next: data => {
    console.log(data);
  }
});
  this.webSocketService.sendMessage(message);
}
onNutrionisteSelected()  {
  let client = new User() ;
client.id = this.user.id ;
let nurtioniste = new User() ;
nurtioniste.id = this.selectedNutrioniste ?? 0 ;
this.newChatroom.client = client ;
this.newChatroom.nutritionist = nurtioniste; 
console.log(this.newChatroom);
  this.chatRoomService.ajouterChatRoom(this.newChatroom).subscribe({
    next: data => {
      console.log(data);
this.result = null ; 
this.getChatRoomsByClientId();
    }
  });
}

}
