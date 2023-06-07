import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewRecipeComponent } from './recipes/view-recipe/view-recipe.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { HttpClientModule } from '@angular/common/http';
import { NewRecipeComponent } from './recipes/new-recipe/new-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewRecipeComponent,
    EditRecipeComponent,
    NewRecipeComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    IonicModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpClientModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
