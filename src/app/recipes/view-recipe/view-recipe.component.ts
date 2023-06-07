import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss'],
})
export class ViewRecipeComponent  implements OnInit {

  apiUrl: string = environment.apiUrl
  IdParamSubscription: Subscription
  recipe: Recipe;

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

getRecipe(id: string) {
  var httpRequest = this.http.get<Recipe>(`${this.apiUrl}/recipes/${id}`)

  httpRequest.subscribe(
      returnedRecipe => {
          this.recipe = returnedRecipe
      })
}

}
