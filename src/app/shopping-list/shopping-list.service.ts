import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
  ingredientsUpdated = new Subject<Ingredient[]>()
  editing = new Subject<number>()

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]

  getIngredient(index: number) {
    return this.ingredients[index]
  }

  getIngredients() {
    return this.ingredients.slice()
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
    this.ingredientsUpdated.next(this.ingredients.slice())
  }
  
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
    this.ingredientsUpdated.next(this.ingredients.slice())
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientsUpdated.next(this.ingredients.slice())
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1)
    this.ingredientsUpdated.next(this.ingredients.slice())
  }
}