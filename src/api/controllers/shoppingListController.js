const { ShoppingList } = require('../models/models.js');
const fs = require('fs');

exports.getShoppingList = async (req, res) => {
    try {
        const shoppingList = await ShoppingList.find({});
        if (!shoppingList) {
            const newList = new ShoppingList({
                ingredients: []
            });
            await newList.save();
            res.status(201).json(newList);
        } else {
            res.status(200).json(shoppingList);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shopping list', error });
    }
}

exports.addItem = async (req, res) => {
    try {
        const { id, ingredients } = req.body;
        const shoppingList = await ShoppingList.findById(id);
        if (!shoppingList) {
            const newList = new ShoppingList({
                ingredients: ingredients
            });
            await newList.save();
            res.status(201).json(newList);
        } else {
            shoppingList.ingredients.push(ingredients);
            await shoppingList.save();
            res.status(201).json(shoppingList);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to shopping list', error });
    }
}