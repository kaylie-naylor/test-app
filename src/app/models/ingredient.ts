export class Ingredient {
    _id: string;
    name: string;
    amount: string;
    unitOfMeasure: unitOfMeasure;
    note?: string | undefined;
}

enum unitOfMeasure {
    'ounce', 'ounces', 'oz', 'pound', 'pounds', 'lb', 'lbs', 'tablespoon', 'tablespoons', 'tbsp', 'tbsps',
    'teaspoon', 'teaspoons', 'tsp', 'tsps', 'cup', 'cups', 'can', 'cans', 'clove', 'cloves', 'pinch', 'pinches'
}
