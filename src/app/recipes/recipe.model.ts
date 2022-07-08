import { Ingredient } from "../shared/ingredient.model";

export interface Recipe {
  _id: string;
  name: string;
  description: string;
  imageSrc: string;
  ingredients: Ingredient[];
}