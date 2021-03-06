import { Component, OnInit, Input } from '@angular/core';
import { Cocktail } from '../../shared/models/cocktail.model';
import { CocktailService } from '../../shared/services/cocktail.service';
import { Ingredient } from '../../shared/models/ingredient.model';
import { PanierService } from '../../shared/services/panier.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.css']
})
export class CocktailDetailsComponent implements OnInit {

  cocktail:Cocktail;
  index: number;

  constructor(private activatedRoute: ActivatedRoute, private cocktailService: CocktailService, private panierService: PanierService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params.index) {
        this.index = params.index;
      } else {
        this.index = 0;
      }
      this.cocktailService.getCocktail(this.index).subscribe( (cocktail: Cocktail) => {
        this.cocktail = cocktail;
        console.log(this.cocktail);
      });
    });
  }

  addPanier(ingredients: Ingredient[]): void {
    this.panierService.addIngredients(ingredients);
  }

  getUrl() {
    return ['/cocktails', this.index, 'edit'];
  }

}
