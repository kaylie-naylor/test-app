const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const unitsOfMeasure = ['ounce', 'ounces', 'oz', 'pound', 'pounds', 'lb', 'lbs', 'tablespoon', 'tablespoons', 'tbsp', 'tbsps',
                                'teaspoon', 'teaspoons', 'tsp', 'tsps', 'cup', 'cups', 'can', 'cans', 'clove', 'cloves', 'pinch', 'pinches', null];
const RecipeSchema = new Schema({
    name: { type: String, required: true, unique: true},
    ingredients: [
        { 
            name: { type: String, required: true},
            amount: { type: String, required: true},
            unitOfMeasure: { type: String, enum: unitsOfMeasure},
            note: { type: String }
        }
    ],
    steps: [{ type: String, required: true }]
});

const ShoppingListSchema = new Schema({
    ingredients: [
        { 
            name: { type: String, required: true, unique: true},
            amount: { type: String, required: true},
            unitOfMeasure: { type: String, enum: unitsOfMeasure}
        }
    ]
});
const Recipe = mongoose.model('Recipe', RecipeSchema);
const ShoppingList = mongoose.model('ShoppingList', ShoppingListSchema);

module.exports = { Recipe, ShoppingList };
