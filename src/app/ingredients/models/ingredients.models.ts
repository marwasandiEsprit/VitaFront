export class Ingredients {
    idIngredients: number;
    description: string;
    products: string;
    images: string;
    recipes: Recipes[];
    constructor(idIngredients: number, description: string, products: string, images:string,recipes: Recipes[]) {
        this.idIngredients = idIngredients;
        this.description = description;
        this.products=products;
        this.images = images;
        this.recipes = recipes;
    }
 
  }
  export class Recipes {
    idRecepies: number;
    dateAdded: Date;
    duration: number; // Can be a floating-point number, represents the duration to prepare the recipe in minutes
    description: string;
    images: string;
    name: string;
    dishType: DishType|null; // Added to include the type of dish
    ingredients: Ingredients[];

    constructor(idRecepies: number, dateAdded: Date, duration: number, description: string, images: string, name: string, dishType: DishType | null, ingredients: Ingredients[]) {
        this.idRecepies = idRecepies;
        this.dateAdded = dateAdded;
        this.duration = duration; // Ensure to handle this as a float in any UI component or data handling
        this.description = description;
        this.images = images;
        this.name = name;
        this.dishType = dishType;
        this.ingredients = ingredients;
    }
}

  export class DishType {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
