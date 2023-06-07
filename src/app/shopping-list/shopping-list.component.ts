import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingList } from '../models/shoppingList';
import { environment } from 'src/environments/environment';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Ingredient } from '../models/ingredient';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent  implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  apiUrl: string = environment.apiUrl
  shoppingList: ShoppingList;
  item: Ingredient;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    console.log("initialized")
    this.getShoppingList();
  }

  newItem() {
    this.item = new Ingredient();
  }

  getShoppingList() {
    console.log("called")
    var httpRequest = this.http.get<ShoppingList>(`${this.apiUrl}/shoppingList/`)
    httpRequest.subscribe(
      returnedShoppingList => {
        console.log(returnedShoppingList);
        this.shoppingList = returnedShoppingList;
      }
    )
  }

  addItem() {
    var httpRequest = this.http.post<any>(`${this.apiUrl}/shoppingList/add`, this.item)
    httpRequest.subscribe(
      returnedShoppingList => {
        this.shoppingList = returnedShoppingList;
      }
    )
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.item, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      if (ev.detail.data) {
        //this.item = new Ingredient();
        //this.item.name = ev.detail.data[0];
        //this.item.amount = ev.detail.data[1];
        //this.item.unitOfMeasure = ev.detail.data[2];

        this.addItem();
      }
    }
  }

}
