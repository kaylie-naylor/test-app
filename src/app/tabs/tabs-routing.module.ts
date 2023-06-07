import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'recipes',
        loadChildren: () => import('../recipes/view-recipe-list/view-recipe-list.module').then(m => m.ViewRecipeListModule)
      },
      {
        path: 'shoppingList',
        loadChildren: () => import('../shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
