const express = require('express');
const router = express.Router();
const shoppingListController = require('../controllers/shoppingListController');

router.get('/', shoppingListController.getShoppingList);
router.post('/add', shoppingListController.addItem);


module.exports = router;
