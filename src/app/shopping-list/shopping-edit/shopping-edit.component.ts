import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) form: NgForm;
  subscription: Subscription;
  isEditMode: boolean = false;
  item: Ingredient;
  itemIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.editing
      .subscribe((index: number) => {
        this.isEditMode = true;
        this.itemIndex = index;
        this.item = this.shoppingListService.getIngredient(index);
        this.form.setValue({
          name: this.item.name,
          amount: this.item.amount
        })
      })
  }

  onSubmit(form: NgForm) {
    const { name, amount } = form.value || {}
    const ingredient = new Ingredient(name, amount)
    if (this.isEditMode) this.shoppingListService.updateIngredient(this.itemIndex, ingredient)
    else this.shoppingListService.addIngredient(ingredient)
    this.onClear()
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.itemIndex)
    this.onClear()
  }

  onClear() {
    this.form.reset()
    this.isEditMode = false
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
