import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient';
import { Recipe } from 'src/app/models/recipe';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
})
export class EditRecipeComponent  implements OnInit {
  apiUrl: string = environment.apiUrl
  recipe: Recipe;
  IdParamSubscription: Subscription
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.IdParamSubscription = this.route.params.subscribe(
      params => {
        this.getRecipe(params['id'])
      }
    )
  }

  ngOnDestroy() {
    this.IdParamSubscription.unsubscribe();
}

  submitForm() {
    this.putRecipe();
  }

  getRecipe(id: string) {
    var httpRequest = this.http.get<Recipe>(`${this.apiUrl}/recipes/${id}`)
  
    httpRequest.subscribe(
        returnedRecipe => {
            this.recipe = returnedRecipe
        })
  }

  addIngredient() {
    this.recipe.ingredients.push( new Ingredient() );
  }
  
  removeIngredient(i: number) {
    this.recipe.ingredients.splice(i, 1);
  }

  addStep() {
    this.recipe.steps.push( "" );
  }
  
  removeStep(i: number) {
    this.recipe.steps.splice(i, 1);
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  putRecipe() {
    var httpRequest = this.http.post<Recipe>(`${this.apiUrl}/recipes/${this.recipe._id}`, this.recipe)
    httpRequest.subscribe(
      returnedRecipe => {
        this.router.navigateByUrl(`/recipes/${returnedRecipe._id}`);
      }
    )
  }

}

