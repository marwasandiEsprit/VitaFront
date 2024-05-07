import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ServiceComponent } from './service/service.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from './logo/logo.component';
import { RegisterComponent } from './register/register.component';
import { TrainComponent } from './train/train.component';
import { PhysiqueComponent } from './physique/physique.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { ListProductsComponent } from './allProducts/listProds/list-products/list-products.component';
import { EditProductsComponent } from './allProducts/editProds/edit-products/edit-products.component';
import { DetailsProductsComponent } from './allProducts/detailProds/details-products/details-products.component';
import { DeleteProductsComponent } from './allProducts/deleteProds/delete-products/delete-products.component';
import { DashProductsComponent } from './Dashs/productsDash/dash-products/dash-products.component';
import { DeleteProdsDashComponent } from './Dashs/prodsDelDash/delete-prods-dash/delete-prods-dash.component';
import { AddToCartComponent } from './Cart/addToCart/add-to-cart/add-to-cart.component';
import { VerifiactionComponent } from './verifiaction/verifiaction.component';
import { ModifierUserComponent } from './modifier-user/modifier-user.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ListUserComponent } from './list-user/list-user.component';
import { AddQuoteComponent } from './Dashs/add-quote/add-quote.component';
import { CalculCaloriesComponent } from './calcul-calories/calcul-calories.component';
import { ChatComponent } from './chat/chat.component';
import { AddPlatDialogComponent } from './add-plat-dialog/add-plat-dialog.component';
import { ListNutrionistesComponent } from './list-nutrionistes/list-nutrionistes.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { ListconsultationComponent } from './Back/Consultation/listconsultation/listconsultation.component';
import { ListpsyfrontComponentComponent } from './Front/psy/listpsyfront-component/listpsyfront-component.component';
import { AddconsultationComponent } from './Front/Consultation/addconsultation/addconsultation.component';
import { EditconsultationComponent } from './Front/Consultation/editconsultation/editconsultation.component';
import { ShowconsultationComponent } from './Front/Consultation/showconsultation/showconsultation.component';
import { DeleteconsultationComponent } from './Front/Consultation/deleteconsultation/deleteconsultation.component';
import { AddrapportpsyComponent } from './Front/Rapportpsy/addrapportpsy/addrapportpsy.component';
import { UpdaterapportpsyComponent } from './Front/Rapportpsy/updaterapportpsy/updaterapportpsy.component';
import { ListrapportpsyComponent } from './Front/Rapportpsy/listrapportpsy/listrapportpsy.component';
import { DeleterapportpsyComponent } from './Front/Rapportpsy/deleterapportpsy/deleterapportpsy.component';
import { ShowrapportpsyComponent } from './Front/Rapportpsy/showrapportpsy/showrapportpsy.component';
import { ListpsyadminComponent } from './Back/listpsyadmin/listpsyadmin.component';
import { StatsComponent } from './stats/stats.component';
import { AdminlisrapportpsyComponent } from './Back/rapportpsy/adminlisrapportpsy/adminlisrapportpsy.component';
import { AdminshowrapportpsyComponent } from './Back/rapportpsy/adminshowrapportpsy/adminshowrapportpsy.component';
import { ChatbotComponent } from './Front/chatbot/chatbot.component';
import { RatingComponent } from './Front/rating/rating.component';
import { StatspsyComponent } from './Back/statspsy/statspsy.component';
import { StatspsyconsultationComponent } from './Back/statspsyconsultation/statspsyconsultation.component';
import { ShowconsultationadminComponent } from './Back/Consultation/showconsultationadmin/showconsultationadmin.component';
import { ListconsultationpsychiatreComponent } from './Front/psy/listpsyfront-component/psyconsultation/listconsultationpsychiatre/listconsultationpsychiatre.component';
import { ShowconsultationpsychiatreComponent } from './Front/psy/listpsyfront-component/psyconsultation/showconsultationpsychiatre/showconsultationpsychiatre.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { ListonsclientComponent } from './Front/Consultation/listonsclient/listonsclient.component';


import { ProfileComponent } from './profile/profile.component';
import { UsersstatisticComponent } from './usersstatistic/usersstatistic.component';
import { EditprofileComponent } from './editprofile/editprofile.component';

import { FoodDataServiceComponent } from './food-data-service/food-data-service.component';
import { ChatbotQAComponent } from './chatbot-qa/chatbot-qa.component';
import { AddQuestionsAComponent } from './Dashs/add-questions-a/add-questions-a.component';
import { AllQuotesComponent } from './Dashs/allQuotes/all-quotes/all-quotes.component';
import { QuotesComponent } from './quotes/quotes/quotes.component';
import { DeleteQuoteComponent } from './Dashs/deleteQuote/delete-quote/delete-quote.component';
import { EditeQuoteComponent } from './Dashs/editeQuote/edite-quote/edite-quote.component';
import { DeleteQuestionComponent } from './Dashs/deleteQuestions/delete-question/delete-question.component';
import { EditeQuestionComponent } from './Dashs/editeQuestions/edite-question/edite-question.component';
import { AllQuestionsComponent } from './Dashs/allquestions/all-questions/all-questions.component';
import { ListrapportnutriComponent } from './Rapportnutritionist/listrapportnutri/listrapportnutri.component';
import { AddrapportnutriComponent } from './Rapportnutritionist/listrapportnutri/addrapportnutri/addrapportnutri.component';
import { EditrapportnutriComponent } from './Rapportnutritionist/listrapportnutri/editrapportnutri/editrapportnutri.component';
// import { CommunityListComponent } from './community/community-list/community-list.component';
// import { CommunityPostsComponent } from './community/community-posts/community-posts.component';
// import { CommunityPostDetailsComponent } from './community/community-post-details/community-post-details.component';
// import { IngredientsComponent } from './ingredients/ingrédients-componets/ingredients/ingredients.component';
// import { RecipeComponent } from './ingredients/recipes-components/recipe/recipe.component';
// import { ListComponent } from './ingredients/listingredients/list/list.component';
// import { CommunityListAdminComponent } from './community/community-list-admin/community-list-admin.component';
// import { ListRecetteComponent } from './ingredients/listRecette/list-recette/list-recette.component';
// import { ChartModule } from 'primeng/chart';
// import { NgOptimizedImage } from '@angular/common';
// import { PaginationModule } from 'ngx-bootstrap/pagination';
// import {BsDropdownModule} from "ngx-bootstrap/dropdown";
// import {TimeagoModule} from "ngx-timeago";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    ServiceComponent,
    ContactComponent,
    LoginComponent,
    LogoComponent,
    RegisterComponent,
    TrainComponent,
    PhysiqueComponent,
    DashboardComponent,
    ProductsComponent,
    ListProductsComponent,
    EditProductsComponent,
    DetailsProductsComponent,
    DeleteProductsComponent,
    DashProductsComponent,
    DeleteProdsDashComponent,
    AddToCartComponent,
    VerifiactionComponent,
    ListUserComponent,
    ModifierUserComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    
    AddQuoteComponent,
    CalculCaloriesComponent,
    ChatComponent,
    AddPlatDialogComponent,
    ListNutrionistesComponent,
    ProductsDetailsComponent,
    ListconsultationComponent,
    ListpsyfrontComponentComponent,
    AddconsultationComponent,
    EditconsultationComponent,
    ShowconsultationComponent,
    DeleteconsultationComponent,
    AddrapportpsyComponent,
    UpdaterapportpsyComponent,
    ListrapportpsyComponent,
    DeleterapportpsyComponent,
    ShowrapportpsyComponent,
    ListpsyadminComponent,
    StatsComponent,
    AdminlisrapportpsyComponent,
    AdminshowrapportpsyComponent,
    ChatbotComponent,
    RatingComponent,
    StatspsyComponent,
    StatspsyconsultationComponent,
    ListconsultationComponent,
    ShowconsultationadminComponent,
    ListconsultationpsychiatreComponent,
    ShowconsultationpsychiatreComponent,
    ListonsclientComponent,
    // FoodDataServiceComponent,
    // CommunityListComponent,
    // CommunityPostsComponent,
    // CommunityPostDetailsComponent,
    // IngredientsComponent,
    // RecipeComponent,
    // ListComponent,
    // CommunityListAdminComponent,
    // ListRecetteComponent,
    ProfileComponent,
    UsersstatisticComponent,
    EditprofileComponent,
    ChatbotQAComponent,
    AddQuestionsAComponent,
    AllQuotesComponent,
    QuotesComponent,
    DeleteQuoteComponent,
    EditeQuoteComponent,
    DeleteQuestionComponent,
    EditeQuestionComponent,
    AllQuestionsComponent,
    ListrapportnutriComponent,
    AddrapportnutriComponent,
    EditrapportnutriComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    RouterModule,
    // ChartModule,
    // NgOptimizedImage,
    // PaginationModule.forRoot(),
    // BsDropdownModule.forRoot(),
    // BrowserAnimationsModule, TimeagoModule.forRoot()
  ],
  providers: [FoodDataServiceComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
