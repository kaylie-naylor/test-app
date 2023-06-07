const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/', recipeController.getAllRecipes);
router.post('/create', recipeController.createRecipe);
router.post('/extract', recipeController.extractRecipe);
router.get('/:id', recipeController.getRecipe);
router.post('/:id', recipeController.updateRecipe);


module.exports = router;
