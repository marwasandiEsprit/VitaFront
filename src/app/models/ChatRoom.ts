import { ChatMessage } from "./ChatMessage";
import { User } from "./user";

export class  ChatRoom {
    id?: number;
    client?: User;
    nutritionist?: User;
    messages? : ChatMessage[];
    }