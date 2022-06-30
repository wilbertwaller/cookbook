import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
  public name: string;
  public description: string;
  public imageSrc: string;
  public ingredients: Ingredient[];

  constructor(name: string, description: string, imageSrc: string, ingredients: Ingredient[]) {
    this.name = name;
    this.description = description;
    this.imageSrc = imageSrc;
    this.ingredients = ingredients;
  }
}