import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from 'src/app/models/ingredient';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss'],
})
export class NewRecipeComponent  implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  apiUrl: string = environment.apiUrl
  recipe: Recipe;
  extractOpen: boolean;
  url: string;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.extractOpen = false;
    this.initializeRecipe();
  }

  submitForm() {
    this.postRecipe();
  }

  initializeRecipe() {
    this.recipe = new Recipe;
    this.recipe.ingredients = [];
    this.recipe.ingredients.push( new Ingredient() );
    this.recipe.steps = [ "" ];
  }

  addIngredient() {
    this.recipe.ingredients.push( new Ingredient() );
  }
  
  removeIngredient() {
    this.recipe.ingredients.pop();
  }

  addStep() {
    this.recipe.steps.push( "" );
  }
  
  removeStep() {
    this.recipe.steps.pop();
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.url, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      if (ev.detail.data) {
        this.url = ev.detail.data;
        this.extractRecipe();
      }
    }
  }

  extractRecipe() {
    var httpRequest = this.http.post<any>(`${this.apiUrl}/recipes/extract`, {url: this.url});
    httpRequest.subscribe(
      returnedRecipe => {
        this.router.navigateByUrl(`/recipes/${returnedRecipe._id}`);
      }
    )
  }

  postRecipe() {
    var httpRequest = this.http.post<Recipe>(`${this.apiUrl}/recipes/create`, this.recipe)
    httpRequest.subscribe(
      returnedRecipe => {
        this.router.navigateByUrl(`/recipes/${returnedRecipe._id}`);
      }
    )
  }

}
