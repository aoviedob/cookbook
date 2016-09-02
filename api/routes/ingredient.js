module.exports = function ingredientRoutes(router, client){
	var ingredient = require('../models/ingredient');
	router.get('/api/ingredients/:id', ingredient(client).get);
	router.post('/api/ingredients', ingredient(client).create);
	router.delete('/api/ingredients/:id', ingredient(client).delete);
}
