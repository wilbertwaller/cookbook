import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { ClientService } from "../shared/client.service";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable({ providedIn: 'root' })
export class RecipeService extends ClientService {
  constructor(
    private shoppingListService: ShoppingListService,
    http: HttpClient
  ) {
    super(http, 'http://localhost:8080/recipes')
  }

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "Easy Meatloaf",
  //     "This is a very easy and no fail recipe for meatloaf. It won't take long to make at all, and it's quite good!",
  //     "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F9408454.jpg&w=596&h=596&c=sc&poi=face&q=60",
  //     [new Ingredient('Ground Beef', 2), new Ingredient('Onion', 1), new Ingredient('Egg', 1)]
  //   ),
  //   new Recipe(
  //     "Quick and Easy French Toast",
  //     "Wake up to an irresistibly delicious breakfast that's super quick and easy to whip up using a few basic ingredients you likely already have in your kitchen.",
  //     "https://res.cloudinary.com/powerreviews/image/upload/f_auto,q_auto,h_768,w_auto/d_portal-no-product-image_ttlfpi.svg/prod/h4ejfzblmorqjv1vgr33.webp",
  //     []
  //   )
  // ]

  getRecipe(id: string, cb: any) {
    this.getById(id)
      .pipe(
        map(res => res?.data)
      )
      .subscribe(
        item => {
          if (cb) cb(item)
        }
      )
  }

  addIngredientsToShoppingList(ingredients) {
    this.shoppingListService.addIngredients(ingredients)
  }
}