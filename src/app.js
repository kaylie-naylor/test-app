const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const recipeRoutes = require('./api/routes/recipeRoutes.js');
const shoppingListRoutes = require('./api/routes/shoppingListRoutes.js');
const cors = require('cors');


mongoose
    .connect('mongodb://localhost/recipes', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
    console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors())

//routes
app.use('/recipes', recipeRoutes);
app.use('/shoppingList', shoppingListRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});