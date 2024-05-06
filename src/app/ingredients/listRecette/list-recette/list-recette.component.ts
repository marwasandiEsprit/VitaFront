import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Recipes } from '../../models/ingredients.models';
import { DishTypeService } from '../../services/dish-type.service';
import { IngredientsService } from '../../services/ingredients.service';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-list-recette',
  templateUrl: './list-recette.component.html',
  styleUrls: ['./list-recette.component.css']
})
export class ListRecetteComponent  implements OnInit {
  searchText: string = '';
  modalRef?: BsModalRef;
  selectedRecipe?: Recipes;
  barChartData: any;
  barChartOptions: any;
  averagePreparationTime?: number;
  mostPopularIngredients?: Object[];
  recipesAddedOnDate?: number;  data: any;
  doughnutChartData: any;
  chartOptions: any;
  data1: any;
  chartOptions1: any;
  subscription!: Subscription;
  dataDishType: any;
  dataDuration: any;
  recipes: Recipes[] = [];
  constructor(private dishTypeService: DishTypeService,private ingredientsService: IngredientsService,private recipeService: RecipesService, private modalService: BsModalService) {}
 
  ngOnInit(): void {
  this.loadRecipes();
  this.fetchStatsByDishType();
  this.fetchStatsByDuration();
  this.loadData1();
   // Chargez les recettes lorsque le composant est initialisé

  }
  
  fetchStatsByDishType(): void {
    this.recipeService.getRecipesStatsByDishType().subscribe(data => {
      this.dataDishType = {
        labels: data.map(stat => stat[0]),
        datasets: [{
          data: data.map(stat => stat[1]),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#E7E9ED",
            "#4BC0C0"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#E7E9ED",
            "#4BC0C0"
          ]
        }]
      };
    });
  }

  fetchStatsByDuration(): void {
    this.recipeService.getRecipesStatsByDuration().subscribe(data => {
      this.dataDuration = {
        labels: data.map(stat => `${stat[0]} minutes`),
        datasets: [{
          data: data.map(stat => stat[1]),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#E7E9ED"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#E7E9ED"
          ]
        }]
      };
    });
  }
  
  loadData1(): void {
    this.recipeService.getMostPopularIngredients().subscribe((data: any[]) => {
      const labels = data.map(item => item[0]);
      const counts = data.map(item => item[1]);
      this.doughnutChartData = {
        labels: labels,
        datasets: [{
          data: counts,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Peut-être faudra-t-il ajuster les couleurs
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      };
    });
  }
  filterRecettes() {
    if (!this.searchText) {
      this.loadRecipes(); // Reset to original data if search text is cleared
    } else {
      this.recipes = this.recipes.filter(recettes =>
        recettes.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  loadRecipes(): void {
    this.recipeService.getAllRecipes().subscribe((data: any[]) => {
      this.recipes = data; // Mettez à jour la liste des recettes avec les données récupérées du service
    });
  }
  openIngredientModal(template1: TemplateRef<any>,recette: Recipes): void {
    this.selectedRecipe = recette;
      this.modalRef = this.modalService.show(template1);
   }
   openIngredientModal2(template2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template2);
    }
}
