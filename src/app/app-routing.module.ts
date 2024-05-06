import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServiceComponent } from './service/service.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TrainComponent } from './train/train.component';
import { PhysiqueComponent } from './physique/physique.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { ListProductsComponent } from './allProducts/listProds/list-products/list-products.component';
import { EditProductsComponent } from './allProducts/editProds/edit-products/edit-products.component';
import { DetailsProductsComponent } from './allProducts/detailProds/details-products/details-products.component';
import { DeleteProductsComponent } from './allProducts/deleteProds/delete-products/delete-products.component';
import { DashProductsComponent } from './Dashs/productsDash/dash-products/dash-products.component';
import { AddToCartComponent } from './Cart/addToCart/add-to-cart/add-to-cart.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ListUserComponent } from './list-user/list-user.component';
import { ModifierUserComponent } from './modifier-user/modifier-user.component';
import { VerifiactionComponent } from './verifiaction/verifiaction.component';
import { AddQuoteComponent } from './Dashs/add-quote/add-quote.component';
import { ChatComponent } from './chat/chat.component';
import { CalculCaloriesComponent } from './calcul-calories/calcul-calories.component';
import { ListNutrionistesComponent } from './list-nutrionistes/list-nutrionistes.component';
import { ListpsyfrontComponentComponent } from './Front/psy/listpsyfront-component/listpsyfront-component.component';
import { ListconsultationComponent } from './Back/Consultation/listconsultation/listconsultation.component';
import { AddconsultationComponent } from './Front/Consultation/addconsultation/addconsultation.component';
import { EditconsultationComponent } from './Front/Consultation/editconsultation/editconsultation.component';
import { ShowconsultationComponent } from './Front/Consultation/showconsultation/showconsultation.component';
import { ShowconsultationadminComponent } from './Back/Consultation/showconsultationadmin/showconsultationadmin.component';
import { DeleteconsultationComponent } from './Front/Consultation/deleteconsultation/deleteconsultation.component';
import { AddrapportpsyComponent } from './Front/Rapportpsy/addrapportpsy/addrapportpsy.component';
import { UpdaterapportpsyComponent } from './Front/Rapportpsy/updaterapportpsy/updaterapportpsy.component';
import { ListrapportpsyComponent } from './Front/Rapportpsy/listrapportpsy/listrapportpsy.component';
import { DeleterapportpsyComponent } from './Front/Rapportpsy/deleterapportpsy/deleterapportpsy.component';
import { ShowrapportpsyComponent } from './Front/Rapportpsy/showrapportpsy/showrapportpsy.component';
import { StatsComponent } from './stats/stats.component';
import { AdminlisrapportpsyComponent } from './Back/rapportpsy/adminlisrapportpsy/adminlisrapportpsy.component';
import { AdminshowrapportpsyComponent } from './Back/rapportpsy/adminshowrapportpsy/adminshowrapportpsy.component';
import { ChatbotComponent } from './Front/chatbot/chatbot.component';
import { RatingComponent } from './Front/rating/rating.component';
import { StatspsyComponent } from './Back/statspsy/statspsy.component';
import { StatspsyconsultationComponent } from './Back/statspsyconsultation/statspsyconsultation.component';
import { ListconsultationpsychiatreComponent } from './Front/psy/listpsyfront-component/psyconsultation/listconsultationpsychiatre/listconsultationpsychiatre.component';
import { ShowconsultationpsychiatreComponent } from './Front/psy/listpsyfront-component/psyconsultation/showconsultationpsychiatre/showconsultationpsychiatre.component';
import { ListonsclientComponent } from './Front/Consultation/listonsclient/listonsclient.component';
import { ListpsyadminComponent } from './Back/listpsyadmin/listpsyadmin.component';
import {UsersstatisticComponent} from "./usersstatistic/usersstatistic.component";
import {ProfileComponent} from "./profile/profile.component";
import {EditprofileComponent} from "./editprofile/editprofile.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'id1', component: ServiceComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'train', component: TrainComponent },
  { path: 'phy', component: PhysiqueComponent },
  { path: 'dash', component: DashboardComponent },
  { path: 'prod', component: ProductsComponent },
  { path: 'dashProds', component: DashProductsComponent },
  { path: 'cart', component: AddToCartComponent },
  { path: 'listProds', component: ListProductsComponent },
  { path: 'editeProds/:id', component: EditProductsComponent },
  { path: 'detailProds/:id', component: DetailsProductsComponent },
  { path: 'deleteProds/:id', component: DeleteProductsComponent },
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'listUser', component: ListUserComponent },
  { path: 'edituser/:id', component: ModifierUserComponent },
  { path: 'verify', component: VerifiactionComponent },
  { path: 'quote', component: AddQuoteComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'CalculCalories', component: CalculCaloriesComponent },
  { path: 'listNutrio', component: ListNutrionistesComponent },
  { path: 'psyc', component: ListpsyfrontComponentComponent },

  { path: 'consultations', component: ListonsclientComponent },
  { path: 'consultationsadmin', component: ListconsultationComponent },
  { path: 'addconsultation/:id', component: AddconsultationComponent },
  { path: 'editconsultation/:id', component: EditconsultationComponent },
  { path: 'show/:id', component: ShowconsultationComponent },
  {
    path: 'showconsultationadmin/:id',
    component: ShowconsultationadminComponent,
  },
  { path: 'deletec/:id', component: DeleteconsultationComponent },
  { path: 'addrapport', component: AddrapportpsyComponent },
  { path: 'editrapport/:id', component: UpdaterapportpsyComponent },
  { path: 'rap', component: ListrapportpsyComponent },
  { path: 'deleter/:id', component: DeleterapportpsyComponent },
  { path: 'showrap/:id', component: ShowrapportpsyComponent },
  { path: 'stats/:id/:year/:month', component: StatsComponent },
  { path: 'rapadmin', component: AdminlisrapportpsyComponent },
  { path: 'showrapadmin/:id', component: AdminshowrapportpsyComponent },
  { path: 'faq', component: ChatbotComponent },
  { path: 'listpsy', component: ListpsyadminComponent },

  { path: 'rating/:id', component: RatingComponent },
  { path: 'statspsy', component: StatspsyComponent },
  { path: 'statspsyconsultation', component: StatspsyconsultationComponent },
  { path: 'consultationpsy', component: ListconsultationpsychiatreComponent },

  {path:'edituser/:id',component:ModifierUserComponent},
  {path:'userStatistics',component:UsersstatisticComponent},
  {path:'profile',component:ProfileComponent},
  { path: "editprofile", component: EditprofileComponent},
  {path:'verify',component:VerifiactionComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
