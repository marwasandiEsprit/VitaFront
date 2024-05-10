import { Achievement } from "./Achievement";

export class User{
    id?:number;
    nom?:string;
    username?:string;
    email?:string;
    password?:string;
    gender?:string;
    prenom?:string;
    rating?:number;
    desctiption?:string;
    achievments?:string;
    fears?:string;
    age?:number;
    roles?: string; // Enumérations devraient être traitées différemment
    connected?: boolean;
    banned?: boolean;
    consultationsAsPsychiatrist?: Consultation[];
    consultationsAsClient?: Consultation[];

    // achievements: Achievement[] = []


}
export interface Consultation {
    idConsultation?: number;
    startTime: string; // Assuming you're using string representation for time in Angular
    consultationdate: string; // Assuming you're using string representation for date in Angular
    psychiatrist: User;
    client: User;
  }
  export interface RapportPsy {
    idRapportPsy: number;
    description: string;
    dateRappPs: Date;
    psychiatrist: User;
    clients: User;
  }
  export interface Feedback {
    id?: number;
    therapist: User;
    user: User;
    rating: number; // Rating from 0 to 5
  }
  export interface Question {
    idquestion: number;
    text: string;
  }
  export interface RapportNutr {
    idRapportNutr?: number; // Assuming Long is equivalent to number in TypeScript
    description?: string;
    dateRappNutr?: Date;
    nutristionist?: User | null; // Assuming User is another model you've defined
    clients?: User; // Assuming User is another model you've defined
  }