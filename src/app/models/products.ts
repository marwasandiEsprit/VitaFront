export class Products {
  idProducts?: number;
  prodName?: string;
  typeProd?: ProductType; 
  price?: number=0;
  quantityP?:number;
  descriptionP?: string;
  imageUrl?: string;
  expiration?: string;
  increaseNeeded?:boolean;
  quantityLow?:boolean;
  quantityExceeded?:Boolean;
}
export class Cart {
  idCart?:number;
  ownerId?: number;
  products?: string;
  idProducts?:number;
  quantity?: number;
  total?: number;
  prods?: Products[];
}

export enum ProductType {
  PROTEIN='PROTEIN',
  EQUIPMENTS='EQUIPMENTS',
  ELECTRONICS = 'ELECTRONICS',
  CLOTHING = 'CLOTHING',
  GROCERY = 'GROCERY',
  BOOKS = 'BOOKS',
  OTHER = 'OTHER'
}

export class Sale {
  idProducts?:number;
  quantitySold?:number;
  buyerId? : number;
}