import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewRecipeListComponent } from './view-recipe-list.component';
import { ViewRecipeComponent } from '../view-recipe/view-recipe.component';
import { EditRecipeComponent } from '../edit-recipe/edit-recipe.component';
import { NewRecipeComponent } from '../new-recipe/new-recipe.component';

const routes: Routes = [
  {
    path: '',
    component: ViewRecipeListComponent,
  },
  { path: "create", component: NewRecipeComponent },
  { path: ":id/edit", component: EditRecipeComponent},
  { path: ":id", component: ViewRecipeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRecipeListRoutingModule {}
