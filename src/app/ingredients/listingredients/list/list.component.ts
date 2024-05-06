import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Products } from 'src/app/models/products';
import { Ingredients, Recipes } from '../../models/ingredients.models';
import { IngredientsService } from '../../services/ingredients.service';
import { RecipesService } from '../../services/recipes.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  status = false;
  sortOption: string = 'name';
  addToggle()
  {
    this.status = !this.status;
  }

  ingredients: Ingredients[] = [];
  ALLingredients: Ingredients[] = [];
  currentFile?: File;

  modalRef?: BsModalRef;
  myURL?: string; // Variable pour stocker l'URL saisie par l'utilisateur
  imageToShow?: string;

  recipes: Recipes[] = [];
  ingredient?: Ingredients;
  products: Products[] = [];
  showForm: boolean = false;
  newIngredient: Ingredients = {
    idIngredients: 0,
    description: '',
    products: '',
    images: '',
    recipes: []
  };
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private ingredientsService: IngredientsService, private recipesSerivce: RecipesService, private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>): void {

    this.modalRef = this.modalService.show(template);
  }
  ngOnInit(): void {

    this.loadIngredients();
    console.log(this.ingredients)
  }

  loadIngredients(): void {
    this.ingredientsService.getAllIngredients().subscribe(value => this.ingredients = value)

  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
    }
  }

  async addIngredient() {
    if (this.currentFile) {
      this.newIngredient.images = await this.uploadMedia();
    }

    this.ingredientsService.addIngredient(this.newIngredient).subscribe(
      (response: Ingredients) => {
        this.ingredients.push(response);

        this.showForm = false;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  // Fonction pour mettre à jour un ingrédient
  updateIngredient(id: number, ingredient: Ingredients): void {
    this.ingredientsService.updateIngredient(id, ingredient).subscribe(
      () => {
        console.log('Recette mise à jour avec succès.');
        // Mettez à jour les données si nécessaire
        this.showSuccessMessage('Ingrédient mis à jour avec succès.');

      },
      error => {
        this.showErrorMessage('Erreur lors de la mise à jour  .');

      }
    );
    // Logique pour mettre à jour l'ingrédient
  }
  // Fonction pour afficher un message de succès pendant 3 secondes
  showSuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000); // Afficher le message pendant 3 secondes
  }

  // Fonction pour afficher un message d'erreur pendant 3 secondes
  showErrorMessage(message: string): void {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000); // Afficher le message pendant 3 secondes
  }

  // recipe.component.ts
  confirmDelete(idIngredients: number) {
    // Récupérer l'élément par son ID
    const confirmationAlert = document.getElementById('confirmationAlert' + idIngredients);
    // Vérifier si l'élément existe avant d'accéder à ses propriétés
    if (confirmationAlert) {
      confirmationAlert.style.display = 'block';
    }
  }

  cancelDelete(idIngredients: number) {
    // Récupérer l'élément par son ID
    const confirmationAlert = document.getElementById('confirmationAlert' + idIngredients);
    // Vérifier si l'élément existe avant d'accéder à ses propriétés
    if (confirmationAlert) {
      confirmationAlert.style.display = 'none';
    }
  }

  deleteIngredient(ingredientId: number): void {
    // Logique pour supprimer une recette avec l'ID recipeId
    this.ingredientsService.deleteIngredient(ingredientId).subscribe(
      () => {
        console.log('Ingredients supprimée avec succès.');
        this.successMessage = "Ingredients supprimée avec succès";
        this.hideConfirmationAlert(ingredientId);
        this.loadIngredients();
        // Mettez à jour les données si nécessaire
      },
      error => {
        console.error('Erreur lors de la suppression de la recette :', error);
      }
    );
  }
  hideConfirmationAlert(idIngredients: number) {
    // Récupérer l'élément par son ID
    const confirmationAlert = document.getElementById('confirmationAlert' + idIngredients);
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
