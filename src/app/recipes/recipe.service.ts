import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipesUpdated = new Subject<Recipe[]>()

  constructor(private shoppingListService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe(
      "Easy Meatloaf",
      "This is a very easy and no fail recipe for meatloaf. It won't take long to make at all, and it's quite good!",
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F9408454.jpg&w=596&h=596&c=sc&poi=face&q=60",
      [new Ingredient('Ground Beef', 2), new Ingredient('Onion', 1), new Ingredient('Egg', 1)]
    ),
    new Recipe(
      "Quick and Easy French Toast",
      "Wake up to an irresistibly delicious breakfast that's super quick and easy to whip up using a few basic ingredients you likely already have in your kitchen.",
      "https://res.cloudinary.com/powerreviews/image/upload/f_auto,q_auto,h_768,w_auto/d_portal-no-product-image_ttlfpi.svg/prod/h4ejfzblmorqjv1vgr33.webp",
      []
    )
  ]

  getRecipes() {
    return this.recipes.slice()
  }

  getRecipe(id: number) {
    return this.recipes[id]
  }

  addIngredientsToShoppingList(ingredients) {
    this.shoppingListService.addIngredients(ingredients)
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesUpdated.next(this.recipes.slice())
  }
  
  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesUpdated.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesUpdated.next(this.recipes.slice());
  }
}