import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Recipe } from 'src/app/models/recipe';
import { environment } from 'src/environments/environment';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-view-recipe-list',
  templateUrl: './view-recipe-list.component.html',
  styleUrls: ['./view-recipe-list.component.scss'],
})
export class ViewRecipeListComponent  implements OnInit {
@ViewChild(IonModal) modal: IonModal;
apiUrl: string = environment.apiUrl
url: string;
recipes: Recipe[];

constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getRecipeList();
  }

  navigate(id: string) {
    this.router.navigateByUrl(`/recipes/${id}`);
  }

  getRecipeList() {
    var httpRequest = this.http.get<Recipe[]>(`${this.apiUrl}/recipes/`)
    httpRequest.subscribe(
      returnedRecipeList => {
        this.recipes = returnedRecipeList;
      }
    )
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

  //removeRecipe() {

  //}

}
