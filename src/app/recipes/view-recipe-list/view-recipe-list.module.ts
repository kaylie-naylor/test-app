import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewRecipeListComponent } from './view-recipe-list.component';

import { ViewRecipeListRoutingModule } from './view-recipe-list-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ViewRecipeListRoutingModule
  ],
  declarations: [ViewRecipeListComponent]
})
export class ViewRecipeListModule {}
