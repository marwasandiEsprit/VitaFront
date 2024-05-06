import { ChangeDetectorRef, Component, OnInit,TemplateRef } from '@angular/core';
import { ProductsService } from 'src/app/components/products.service';
import { Products } from 'src/app/models/products';
import { Ingredients, Recipes } from '../../models/ingredients.models';
import { IngredientsService } from '../../services/ingredients.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RecipesService } from '../../services/recipes.service';
import { Subscription } from 'rxjs';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  barChartData: any;
  barChartOptions: any;
  averagePreparationTime!: number;
  mostPopularIngredients!: Object[];
  recipesAddedOnDate!: number;  data: any;
  doughnutChartData: any;
  chartOptions: any;
  data1: any;
  chartOptions1: any;
  subscription!: Subscription;
  dataDishType: any;
  dataDuration: any;
  searchText: string = '';

  modalRef?: BsModalRef;
  myURL?: string; // Variable pour stocker l'URL saisie par l'utilisateur
  imageToShow?: string;
  ingredients: Ingredients[] = [];
  recipes: Recipes[] = [];
ingredient?:Ingredients;
  products: Products[] = [];
  showForm: boolean = false;
  newIngredient: Ingredients = {
    idIngredients: 0,
    description: '',
    products: '',
    images: '',
    recipes: []
  };
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Créer l'URL de l'image sélectionnée localement
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageToShow = e.target.result;
      };
      reader.readAsDataURL(file);
      console.log(reader)
    }
  }
  constructor(private cdr: ChangeDetectorRef,private ingredientsService: IngredientsService, private recipesSerivce: RecipesService,private modalService: BsModalService) { }
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }
  openIngredientModal2(template2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template2);
    }
  openIngredientModal(template1: TemplateRef<any>,ingredient: Ingredients): void {
   this.recipesSerivce.getAllRecipesWithIngredients(ingredient.idIngredients).subscribe(
      (response: Recipes[]) => {
        this.recipes = response;
        this.ingredient=ingredient;
        this.ingredient.recipes=this.recipes;
      },
      (error: any) => {
        console.error(error);
      }
    );

 

     this.modalRef = this.modalService.show(template1);
  }
 
  ngOnInit(): void {
    this.loadIngredients();
    this.initializeChartOptions();
    this.loadAveragePreparationTime();
    this.loadMostPopularIngredients();
    this.fetchStatsByDishType();
    this.fetchStatsByDuration();
  }

  fetchStatsByDishType(): void {
    this.recipesSerivce.getRecipesStatsByDishType().subscribe(data => {
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
    this.recipesSerivce.getRecipesStatsByDuration().subscribe(data => {
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
  initializeChartOptions(): void {
    ///this.chartOptions = this.data ;
    
    this.barChartOptions=this.loadStats();
    this.chartOptions1=this.loadData1();
  }

  loadAveragePreparationTime(): void {
     
  }
  loadStats() {
   
}

  loadChartData(): void {
    const currentDate = new Date();
    this.recipesSerivce.getRecipesAddedOnDate(currentDate).subscribe(data => {
      console.log(data)
      // Mettez à jour le graphique avec les données récupérées
      this.barChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Recipes Added',
          backgroundColor: '#42A5F5',
          data: data // Insérez les données récupérées ici
        }]
      };
    });
  }


  loadMostPopularIngredients(): void {
    this.recipesSerivce.getMostPopularIngredients().subscribe(data => {
      this.mostPopularIngredients = data;
    });
  }

  loadRecipesAddedOnDate(date: Date): void {
    this.recipesSerivce.getRecipesAddedOnDate(date).subscribe(data => {
      this.recipesAddedOnDate = data;
    });
  }
  loadData1(): void {
    this.recipesSerivce.getMostPopularIngredients().subscribe((data: any[]) => {
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
  filterIngredients() {
    if (!this.searchText) {
      this.loadIngredients(); // Reset to original data if search text is cleared
    } else {
      this.ingredients = this.ingredients.filter(ingredient =>
        ingredient.products.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  onURLInserted() {
    // Mettre à jour l'URL de l'image à afficher avec celle saisie par l'utilisateur
    this.imageToShow = this.myURL;
    console.log(this.imageToShow)
  }
  showAddIngredientForm(): void {
    this.showForm = true;
  }

  addIngredient(): void {
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
  
  viewStatistics( ) {
    // Implement logic to view statistics for the ingredient
    console.log('Viewing statistics for:'  );
}
  loadIngredients(): void {
    this.ingredientsService.getAllIngredients().subscribe(
      (response: Ingredients[]) => {
        this.ingredients = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
 
 
 
}
