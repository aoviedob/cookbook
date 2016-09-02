module.exports = function recipeRoutes(router, client){
	var recipe = require('../models/recipe');
	router.get('/api/recipes', recipe(client).getAll);
	router.post('/api/recipes', recipe(client).create);
	router.put('/api/recipes/:id', recipe(client).edit);
	router.delete('/api/recipes/:id', recipe(client).delete);
}
