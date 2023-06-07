const { Recipe } = require('../models/models.js');
const { Scraper, Root, CollectContent } = require('nodejs-web-scraper');
const unitsOfMeasure = ['ounce', 'ounces', 'oz', 'pound', 'pounds', 'lb', 'lbs', 'tablespoon', 'tablespoons', 'tbsp', 'tbsps',
                                'teaspoon', 'teaspoons', 'tsp', 'tsps', 'cup', 'cups', 'can', 'cans', 'clove', 'cloves', 'pinch', 'pinches'];
const fs = require('fs');

exports.getRecipe = async (req, res) => {
    try {
        const id = req.params.id;
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipe data', error });
    }
}

exports.getAllRecipes = async (req, res) => {
    try {
        const allRecipes = await Recipe.find({});
        res.status(200).json(allRecipes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipes', error });
    }
}

exports.createRecipe = async (req, res) => {
    try {
        const { name, ingredients, steps } = req.body;
        const newRecipe = new Recipe({
            name: name,
            ingredients: ingredients,
            steps: steps
        });
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ message: 'Error creating recipe', error });
    }
}

exports.updateRecipe = async (req, res) => {
    try {
        const { name, ingredients, steps } = req.body;
        const id = req.params.id;
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        recipe.name = name;
        recipe.ingredients = ingredients;
        recipe.steps = steps;
        await recipe.save();
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'Error updating recipe', error });
    }
}

exports.extractRecipe = async (req, res) => {
    try {
        const siteInput = req.body.url;
        console.log(siteInput)
        const config = {
            baseSiteUrl: siteInput,
            startUrl: siteInput,
            filePath: './extractedRecipes/',
            logPath: './logs/'
        }

        const scraper = new Scraper(config);
        const root = new Root();
        const title = new CollectContent('h1', { name: 'title' });
        const ingredients = new CollectContent('.mntl-structured-ingredients__list-item', { name: 'ingredients'})
        const steps = new CollectContent('.comp .mntl-sc-block .mntl-sc-block-html', {name: 'steps'});

        
        root.addOperation(title);
        root.addOperation(ingredients);
        root.addOperation(steps);

        await scraper.scrape(root);

        const titles = title.getData();
        const ingredientsList = ingredients.getData();
        let convertedIngredientList = [];
        for (let i of ingredientsList) {
            convertedIngredientList.push(convertToIngredient(i));
        }
        const stepsList = steps.getData();
        const newRecipe = new Recipe({
            name: titles[0],
            ingredients: convertedIngredientList,
            steps: stepsList
        });
        console.log(newRecipe);
        await newRecipe.save();
        console.log("saved!")
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ message: 'Error extracting recipe', error });
    }
}

function convertToIngredient(i) {
    let ar = i.split(" ");
    let note = null;
    let unitOfMeasure = null;
    let amount = ar[0];
    let s = '';
    let next = 1;
    if (ar[next].startsWith("(")) {
        note = ar[next];
        next++;
        while (!ar[next].endsWith(")")) {
            note += " " + ar[next];
            next++;
        }
        // Add element with closing parenthese
        note += " " + ar[next];
        next++;
    }
    for (u of unitsOfMeasure) {
        if (ar[next].includes(u)) {
            unitOfMeasure = ar.at(next);
            next++;
        }
    }
    for (let i = next; i < ar.length; i++ ) {
        s += ar[i];
        if (i != ar.length - 1) {
            s += " ";
        }
    }
    let ingArray = s.split(", ");
    let ingredientName = ingArray[0];
    if (ingArray.length > 1 && ingArray[1] != "") {
        if (note && note != "") {
            note += ", " + ingArray[1];
        } else {
            note = ingArray[1];
        }
    }
    return {name: ingredientName, amount: amount, unitOfMeasure: unitOfMeasure, note: note};
}
