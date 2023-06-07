import { Ingredient } from "./ingredient";

export class Recipe {
    _id: string;
    name: string;
    ingredients: Ingredient[];
    steps: string[];
}