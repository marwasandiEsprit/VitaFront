import {User} from "./user";

export interface Posts {
  idPosts: number;
  idOwner: number;
  createdDate: Date;
  description: string;
  post: string;
  imageP: string;
}

export interface Comments {
  idComments: number;
  createdDate: Date;
  comment: string;
  posts: Posts,
  user: User
}


