import { Component, OnInit,TemplateRef } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { DishType, Ingredients, Recipes } from '../../models/ingredients.models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IngredientsService } from '../../services/ingredients.service';
import { DishTypeService } from '../../services/dish-type.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  status = false;
  sortOption: string = 'name';
   addToggle()
  {
    this.status = !this.status;
  }

  modalRef?: BsModalRef;
  ingredientSets: Ingredients[] = [];
  selectedIngredients: Ingredients[] = []; // Initialisez selectedIngredients
  selectedDishType!: DishType;
  recipe:  Recipes = {
    idRecepies: 0,
    name:'',
    dateAdded:new Date(),
    duration:0,
    description: '',
    images: '',
    dishType:null, 
    ingredients: [] // Initialisez newRecipe.ingredients à une tableau vide
  };; // Déclarer la propriété recipe
  newRecipe: Recipes = {
    idRecepies: 0,
 
    dateAdded:new Date(),
     duration:0,
    description: '',
    images: '',
    dishType:null, 
    name:'',
    ingredients: [] // Initialisez newRecipe.ingredients à une tableau vide
  };
  deleteSuccessAlertVisible = false;
  dishTypes: DishType[] = [];
  recipes: any[] = [];
  successMessage: string = '';
  successMessageUpdate: string = '';
  currentFile?: File;
  imageToShow?: string;

  errorMessage: string = '';
  constructor(private dishTypeService: DishTypeService,private ingredientsService: IngredientsService,private recipeService: RecipesService, private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }
  openUpdateRecipeModal(template1: TemplateRef<any>,recipeId: number):void {
   this.recipe= this.recipes.find(recipe => recipe.idRecepies === recipeId);

    this.modalRef = this.modalService.show(template1);  
  }

  onDishTypeChange(event: any) {
    this.selectedDishType = event.target.value;
    console.log('Selected dish type:', this.selectedDishType); // Or use this value for further processing
  }
  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
    }
  }
  async addRecipe(): Promise<void> {
    this.newRecipe.ingredients = this.selectedIngredients;
    if (this.currentFile) {
      this.newRecipe.images = await this.uploadMedia();
    }
  
    this.newRecipe.dishType = this.selectedDishType;
    console.log("disch",this.newRecipe.description);
    this.modalRef?.hide();
    this.recipeService.addRecipe(this.newRecipe)
      .subscribe(
        response => {
          this.successMessage = 'Recette ajoutée avec succès.';
          this.errorMessage = '';
          console.log('Recette ajoutée avec succès :', response);
          this.loadRecipes();

          // Masquer le formulaire et réinitialiser les messages après 0.2 seconde
          setTimeout(() => {
            this.successMessage = '';
            this.errorMessage = '';
            // Code pour masquer le formulaire (par exemple, utiliser une variable de contrôle)
          }, 400);
        },
        error => {
          this.successMessage = '';
          this.errorMessage = 'Erreur lors de l\'ajout de la recette : ' + error.message;
          console.error('Erreur lors de l\'ajout de la recette :', error);

          // Masquer le formulaire et réinitialiser les messages après 0.2 seconde
          setTimeout(() => {
            this.successMessage = '';
            this.errorMessage = '';
            // Code pour masquer le formulaire (par exemple, utiliser une variable de contrôle)
          }, 400);
        }
      ); 
  }
// Supposons que vous avez une méthode pour ajouter des ingrédients sélectionnés
addSelectedIngredient(selectedIngredient: Ingredients) {
  this.selectedIngredients.push(selectedIngredient);
}

  ngOnInit(): void {
    this.loadRecipes(); // Chargez les recettes lorsque le composant est initialisé
    this.getAllIngredients();
    this.dishTypeService.getDishTypes().subscribe({
      next: (types) => {
        this.dishTypes = types;
      },
      error: (error) => console.error('There was an error fetching the dish types', error)
    });
 
  }
  getAllIngredients(): void {
    this.ingredientsService.getAllIngredients().subscribe(
      (data: any[]) => {
        this.ingredientSets = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des ingrédients :', error);
      }
    );
  }
  isSelected(ingredient: any): boolean {
     return this.selectedIngredients.includes(ingredient);
  }

  // Méthode pour basculer la sélection d'un ingrédient
  toggleSelection(ingredient: any): void {
    if (this.isSelected(ingredient)) {
      // Si l'ingrédient est déjà sélectionné, le supprimer de la liste
      const index = this.selectedIngredients.indexOf(ingredient);
      this.selectedIngredients.splice(index, 1);
    } else {
      // Sinon, l'ajouter à la liste des ingrédients sélectionnés
      this.selectedIngredients.push(ingredient);
    }
  }

  loadRecipes(): void {
    this.recipeService.getAllRecipes().subscribe((data: any[]) => {
      this.recipes = data; // Mettez à jour la liste des recettes avec les données récupérées du service
    });
  }
  updateRecipe(recipeId: number,recipe:Recipes) {
    this.modalRef?.hide(); 
      this.recipe.ingredients = this.selectedIngredients;


    // Logique pour mettre à jour une recette avec l'ID recipeId
    console.log(recipe.ingredients);
  
    this.recipeService.updateRecipe(recipe).subscribe(
      () => {
        console.log(recipe);
        console.log('Recette mise à jour avec succès.');

        this.successMessage ='Recette  mise à jour  avec succès';
        this.errorMessage = '';
        setTimeout(() => {
           this.successMessage = '';
          this.errorMessage = '';
          // Code pour masquer le formulaire (par exemple, utiliser une variable de contrôle)
        }, 600);
         this.loadRecipes();
               // Mettez à jour les données si nécessaire
      },
      error => {          
        this.errorMessage ="ERRORR";

        setTimeout(() => {
          this.errorMessage ='';
          this.successMessage = '';

          // Code pour masquer le formulaire (par exemple, utiliser une variable de contrôle)
        }, 600);
        console.error('Erreur lors de la mise à jour de la recette :', error);
      }
    );
  }


// recipe.component.ts
confirmDelete(recipeId: number) {
  // Récupérer l'élément par son ID
  const confirmationAlert = document.getElementById('confirmationAlert' + recipeId);
  // Vérifier si l'élément existe avant d'accéder à ses propriétés
  if (confirmationAlert) {
      confirmationAlert.style.display = 'block';
  }
}

cancelDelete(recipeId: number) {
  // Récupérer l'élément par son ID
  const confirmationAlert = document.getElementById('confirmationAlert' + recipeId);
  // Vérifier si l'élément existe avant d'accéder à ses propriétés
  if (confirmationAlert) {
      confirmationAlert.style.display = 'none';
  }
}

deleteRecipe(recipeId: number) {
  // Logique pour supprimer une recette avec l'ID recipeId
  this.recipeService.deleteRecipe(recipeId).subscribe(
      () => {
          console.log('Recette supprimée avec succès.');
           this.successMessage ="Recette supprimée avec succès";
           this.hideConfirmationAlert(recipeId);
          this.loadRecipes();
          // Mettez à jour les données si nécessaire
      },
      error => {
          console.error('Erreur lors de la suppression de la recette :', error);
      }
  );
}
hideConfirmationAlert(recipeId: number) {
  // Récupérer l'élément par son ID
  const confirmationAlert = document.getElementById('confirmationAlert' + recipeId);
  // Vérifier si l'élément existe avant d'accéder à ses propriétés
  if (confirmationAlert) {
      confirmationAlert.style.display = 'none';
  }

}
async uploadMedia() {
  return new Promise<string>((resolve, reject) => {
    this.ingredientsService.upload(this.currentFile!).subscribe({
      next: (obj: any) => {
        if (obj instanceof HttpResponse) {
          console.log(obj.body.url);
          resolve(obj.body.url);
        }
      },
      error: (error: any) => {
        reject(error);
      }
    });
  });
}
}
 

