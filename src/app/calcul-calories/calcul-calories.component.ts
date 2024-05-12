import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Plat } from '../models/Plat';
import { PlatsQauntites } from '../models/PlatsQauntites';
import { PlatQuantite } from '../models/PlatQuantite';
import { PlatService } from '../_services/PlatService';
import { PlatConseils } from '../models/PlatConseils';
import { Taille } from '../models/Taille';
import { User } from '../models/user';
import { StorageService } from '../_services/storage.service';
import { ERole } from '../models/ERole';

@Component({
  selector: 'app-calcul-calories',
  templateUrl: './calcul-calories.component.html',
  styleUrls: ['./calcul-calories.component.css']
})
export class CalculCaloriesComponent implements OnInit {
  plats: Plat[] = [];
  newPlat: Plat = {
    name: '',
    quantity: null,
    nbCalories: null
  };
  newnewPlat: Plat = {
    name: '',
    quantity: null,
    nbCalories: null,

  };
  user = new User() ;
  IsNutrio : number | null = null ;
  femme : string = "Femme" ;
  homme : string = "Homme" ;
  age : number | null = null ;
  genre : string | null = null ;
  test:number | null = null ;
  calcul:number |null = null ;
  calcul1:number |null = null ;
  result:number | null = null ;
  selectedPlat: string | null = null ;
  selectedQuantity: number | null = null ;
  advice : number | null = null ;
  poids : number | null = null ;
  taille :number | null = null ;
  GetAd : number | null = null ;
  conseilAdapted = new PlatConseils() ;
  conseilEmpty = new PlatConseils() ;
  platsQuantites = new PlatsQauntites();
  private roles: string[] = [];
  yourIMC : number = 0 ;
  conseils: PlatConseils[] = [
    {  taille: Taille.Maigre, maxQuantite: null, minQauntite: null, conseil: ''},
    { taille: Taille.Correct, maxQuantite: null, minQauntite: null, conseil: '' },
    {  taille: Taille.Obese, maxQuantite: null, minQauntite: null, conseil: '' },
    { taille: Taille.Tres_obese, maxQuantite: null, minQauntite: null, conseil: '' }
  ] ;
  newconseils: PlatConseils[] = [
    {  taille: Taille.Maigre, maxQuantite: null, minQauntite: null, conseil: ''},
    { taille: Taille.Correct, maxQuantite: null, minQauntite: null, conseil: '' },
    {  taille: Taille.Obese, maxQuantite: null, minQauntite: null, conseil: '' },
    { taille: Taille.Tres_obese, maxQuantite: null, minQauntite: null, conseil: '' }
  ] ;
  constructor(private platService: PlatService,private storageService : StorageService) { }

  ngOnInit(): void {
    this.platService.getPlats().subscribe(plats => {
      this.plats = plats;
    });
    this.user = this.storageService.getUser();
    console.log(this.user);
    this.IsNutrioniste();

    const users = this.storageService.getUser();

    this.roles = users.roles;

  }
  IsNutrioniste() {


    if (this.user?.roles?.includes(ERole.ROLE_NUTRITOINISTE)) {
      this.IsNutrio = 1 ;
    }
  }

  isUserRoleNut(): boolean {
    return this.roles.includes('ROLE_NUTRITOINISTE');
  }
  GiveAdvice(plat: any) {
    plat.advice = true;
this.advice = 1 ;
  }
  
  GetAdvice(id : any) {

    this.GetAd = 1 ;
    let imc  =0 ;
    let yourTaille = Taille.Correct;
        
    if (this.taille != null && this.poids != null ) {
      let tailleEnMetre = this.taille / 100; // convertir la taille en mètres
      imc  = this.poids / (tailleEnMetre * tailleEnMetre);
     
    }
    if(this.age != null) {

    if (this.genre === this.homme) { 
      
      if (this.age >= 18 && this.age <= 24) {
        if (imc < 20.7) {
          yourTaille = Taille.Maigre;
        } else if (imc >= 20.7 && imc < 26.4) {
          yourTaille = Taille.Correct;
        } else if (imc >= 26.4 && imc < 27.8) {
          yourTaille = Taille.Obese;
        } else if (imc >= 27.8) {
          yourTaille = Taille.Tres_obese;
        }
      } else if (this.age >= 25 && this.age <= 34) {
        if (imc < 21.3) {
          yourTaille = Taille.Maigre;
        } else if (imc >= 21.3 && imc < 27.1) {
          yourTaille = Taille.Correct;
        } else if (imc >= 27.1 && imc < 28.7) {
          yourTaille = Taille.Obese;
        } else if (imc >= 28.7) {
          yourTaille = Taille.Tres_obese;
        }
      } else if (this.age >= 35 && this.age <= 44) {
        if (imc < 21.8) {
          yourTaille = Taille.Maigre;
        } else if (imc >= 21.8 && imc < 27.3) {
          yourTaille = Taille.Correct;
        } else if (imc >= 27.3 && imc < 29.0) {
          yourTaille = Taille.Obese;
        } else if (imc >= 29.0) {
          yourTaille = Taille.Tres_obese;
        }
      } else if (this.age >= 45 && this.age <= 54) {
        if (imc < 22.1) {
          yourTaille = Taille.Maigre;
        } else if (imc >= 22.1 && imc < 27.6) {
          yourTaille = Taille.Correct;
        } else if (imc >= 27.6 && imc < 29.4) {
          yourTaille = Taille.Obese;
        } else if (imc >= 29.4) {
          yourTaille = Taille.Tres_obese;
        }
      } else if (this.age >= 55) {
        if (imc < 22.4) {
          yourTaille = Taille.Maigre;
        } else if (imc >= 22.4 && imc < 27.8) {
          yourTaille = Taille.Correct;
        } else if (imc >= 27.8 && imc < 29.7) {
          yourTaille = Taille.Obese;
        } else if (imc >= 29.7) {
          yourTaille = Taille.Tres_obese;
        }
      } }
      if (this.genre === this.femme) { 
      
        if (this.age >= 18 && this.age <= 24) {
          if (imc < 19.1) {
            yourTaille = Taille.Maigre;
          } else if (imc >= 19.1 && imc < 25.8) {
            yourTaille = Taille.Correct;
          } else if (imc >= 25.8 && imc < 27.3) {
            yourTaille = Taille.Obese;
          } else if (imc >= 27.3) {
            yourTaille = Taille.Tres_obese;
          }
        } else if (this.age >= 25 && this.age <= 34) {
          if (imc < 19.9) {
            yourTaille = Taille.Maigre;
          } else if (imc >= 19.9 && imc < 26.4) {
            yourTaille = Taille.Correct;
          } else if (imc >= 26.4 && imc < 28.0) {
            yourTaille = Taille.Obese;
          } else if (imc >= 28.0) {
            yourTaille = Taille.Tres_obese;
          }
        } else if (this.age >= 35 && this.age <= 44) {
          if (imc < 20.5) {
            yourTaille = Taille.Maigre;
          } else if (imc >= 20.5 && imc < 26.7) {
            yourTaille = Taille.Correct;
          } else if (imc >= 26.7 && imc < 28.4) {
            yourTaille = Taille.Obese;
          } else if (imc >= 28.4) {
            yourTaille = Taille.Tres_obese;
          }
        } else if (this.age >= 45 && this.age <= 54) {
          if (imc < 21.0) {
            yourTaille = Taille.Maigre;
          } else if (imc >= 21.0 && imc < 27.0) {
            yourTaille = Taille.Correct;
          } else if (imc >= 27.0 && imc < 28.8) {
            yourTaille = Taille.Obese;
          } else if (imc >= 28.8) {
            yourTaille = Taille.Tres_obese;
          }
        } else if (this.age >= 55) {
          if (imc < 21.4) {
            yourTaille = Taille.Maigre;
          } else if (imc >= 21.4 && imc < 27.3) {
            yourTaille = Taille.Correct;
          } else if (imc >= 27.3 && imc < 29.2) {
            yourTaille = Taille.Obese;
          } else if (imc >= 29.2) {
            yourTaille = Taille.Tres_obese;
          }
        } }   
    }
    this.yourIMC = imc;
    let platTrouve = this.plats.find(plat => plat.idPlat === id);
    this.conseilAdapted = platTrouve?.platConseils?.find(c => c.taille === yourTaille) ?? this.conseilEmpty; 
    this.poids = null ;
    this.age = null ; 
    this.genre = null ; 
    this.taille = null ;
  }
  CloseAdvice(plat: any) {
    plat.advice = false;
    this.advice = null ; 
    this.GetAd = null ;
  }
  Cancel() {
    this.test = null ;
  }
  getConseilTaille(taille : any) : string{
let adaptedPhrase = "" ;
if(taille === Taille.Maigre) {
  adaptedPhrase = "faible"
}
if(taille === Taille.Moyen) {
  adaptedPhrase = "à la limite"
}
if(taille === Taille.Correct) {
  adaptedPhrase = "idéal"
}
if(taille === Taille.Obese) {
  adaptedPhrase = "élévée"
}
if(taille === Taille.Tres_obese) {
  adaptedPhrase = "trés élévée"
}
return adaptedPhrase ;
  }
AjouterPlat() {
  this.test = 1 ;
}
  addPlat(): void {
    console.log(this.newPlat)
    this.platService.addPlat({plat : this.newPlat,conseil : this.conseils}).subscribe(plat => {
      this.plats.push(plat);
    });
    this.newPlat = this.newnewPlat;
    this.conseils = this.newconseils ;

    this.test = null ;
  }

  deletePlat(id: any): void {
    this.platService.deletePlat(id).subscribe(() => {
      this.plats = this.plats.filter(plat => plat.idPlat !== id);
    });
  }
  OpenCalcullator() {
this.calcul = 1 ;
this.calcul1 = 1;
  }
  CloseCalculator() {
this.calcul = null; 
this.calcul1 = null; 
  }
addPlatQuantite() {
  const platQuantite = new PlatQuantite();
  platQuantite.platId = this.selectedPlat;
  platQuantite.quantity = this.selectedQuantity;
  this.platsQuantites.platsQuantity = [...this.platsQuantites.platsQuantity || [], platQuantite];
  this.selectedPlat = null;
  this.selectedQuantity = null;
  console.log(this.platsQuantites);
}
calculateCalories() {
  this.platService.CalculCalories(this.platsQuantites).subscribe(result => {
      this.result = result;
    }
  );
}
getPlatNameById(platId: number): string {

  const plat = this.plats.find(p => p.idPlat === parseInt(platId.toString()));

  console.log(plat);
  return plat?.name ?? '';

}
deletePlatQuantite(index: number): void {
  this.platsQuantites.platsQuantity?.splice(index, 1);
}

}
